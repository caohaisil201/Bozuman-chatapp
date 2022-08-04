import { Response } from 'express';
import { RoomsService } from '../services/rooms.service';
import { TypedRequestBody } from '../utils/TypeRequestBody.utils';
import _Error from '../utils/Error.utils';

export class Chat {
  public addNewRoom = async (
    req: TypedRequestBody<{
      name: string;
      user_list: Array<string>;
      type: string;
      admin: string;
    }>,
    res: Response
  ) => {
    const room = {
      name: req.body.name,
      user_list: req.body.user_list,
      type: req.body.type,
      admin: req.body.admin,
    };
    try {
      const createRoomResponse = await RoomsService.addNewRoom(room);
      res.status(200).json(createRoomResponse);
    } catch (err) {
      throw err;
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
      res.status(200).json({ success: true ,newestIndex: newestIndex });
    } catch (err) {
      throw err;
    }
  };
}
