import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { RoomsService } from '../services/rooms.service';
import { TypedRequestBody } from '../utils/TypeRequestBody.utils';
import _Error from '../utils/Error.utils';
import _CONF from '../configs/chat.config'


export class Chat {
  public addNewRoom = async (
    req: TypedRequestBody<{
      name: string;
      user_list: Array<string>;
    }>,
    res: Response
  ) => {
    const username: any = req.context?.DecodePayload.username;
    let userList: any = req.body.user_list;
    userList = userList.filter((user: string) => user != username);
    userList = [...userList, username];
    const type = userList.length > _CONF.NUMBER_OF_USER_DIRECT_MESSAGE ? _CONF.CHANNEL_MESSAGE : _CONF.DIRECT_MESSAGE
    const room = {
      name: req.body.name,
      user_list: userList,
      type: type,
      admin: username,
    };
    try {
      const createRoomResponse = await RoomsService.addNewRoom(room);
      if (createRoomResponse) {
        res.status(200).json({ success: true });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  };

  public getMessageInRoomByPage = async (
    req: TypedRequestBody<{}>,
    res: Response
  ) => {
    const data = {
      room_id: req.query.room_id,
      page: req.query.page,
      page_size: req.query.page_size,
    };
    try {
      const messageList = await RoomsService.getMessageInRoomByPage(data);
      res.status(200).json(messageList);
    } catch (err) {
      throw err;
    }
  };

  public getNewestMessageBucket = async (
    req: TypedRequestBody<{}>,
    res: Response
  ) => {
    const room_id = req.query.room_id as string;
    try {
      const newestIndex = await RoomsService.getNewestMessageBucket(room_id);
      res.status(200).json({ success: true, newestIndex: newestIndex });
    } catch (err) {
      throw err;
    }
  };

  public getRoomInfo = async (req: TypedRequestBody<{}>, res: Response) => {
    const room_id = req.query.room_id as string;
    try {
      const roomInfo = await RoomsService.getRoomInfo(room_id);
      res.status(200).json({ success: true, roomInfo: roomInfo });
    } catch (err) {
      throw err;
    }
  };

  public postEditRoom = async (
    req: TypedRequestBody<{ name: string, user_list: Array<string>, room_id: number, admin: string}>,
    res: Response
  ) => {
    const username: any = req.context?.DecodePayload.username;
    const {name, user_list, room_id, admin} = req.body;
    try {
      await UsersService.checkUserIsInRoom(username, room_id);
      const roomInfo = await RoomsService.getRoomInfo(room_id);
      if (roomInfo) {
        if (roomInfo.admin !== username) {
          return res.status(401).json({ success: false, error: "Unauthorized" });
        }
        await RoomsService.editRoom(name, user_list, room_id, admin)
        res.status(200).json({ success: true});
      }

    } catch (err) {
      throw err;
    }
  };
}
