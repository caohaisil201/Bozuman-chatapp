import { Request, Response } from 'express';
import { RoomsService } from '../services/rooms.service';
import { TypedRequestBody } from './authentication.controller';

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
      console.log(createRoomResponse);
      res.status(200).json(createRoomResponse);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
