import { Request, Response } from 'express';
import { RoomsService } from '../services/rooms.service';
import { TypedRequestBody } from '../utils/TypeRequestBody.utils';

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

  public insertMessageIntoRoom = async (
    req: TypedRequestBody<{
      room_id: string;
      sender: string;
      content: string;
    }>,
    res: Response
  ) => {
    const message = {
      room_id: req.body.room_id,
      sender: req.body.sender,
      content: req.body.content,
    };
    try {
      const insertMessage = await RoomsService.insertChatMessageIntoRoom(
        message
      );
      res.status(200).json(insertMessage);
    } catch (err) {
      throw err;
    }
  };

  public getMessageInRoomByPage = async (
    req: TypedRequestBody<{
      room_id: string;
      page: number;
      pageSize: number;
    }>,
    res: Response
  ) => {
    const data = {room_id: req.query.room_id, page: req.query.page, pageSize: req.query.pageSize};
    try {
      const messageList = await RoomsService.getMessageInRoomByPage(data);
      res.status(200).json(messageList);
    } catch (err) {
      throw err;
    }
  };
}
