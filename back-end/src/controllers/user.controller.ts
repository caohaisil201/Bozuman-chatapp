import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import _Error from '../utils/Error.utils';

export class User {
  public getUserInfo = async (req: Request, res: Response) => {
    try {
      const username = req.context?.DecodePayload.username;
      const userInfo = await UsersService.getUserInfo(username);
      res.status(200).json({
        success: true,
        data: userInfo,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  };

  public changeRoomStatus = async (req: Request, res: Response) => {
    try {
      const username = req.context?.DecodePayload.username;
      const room_id = req.body.room_id;
      const status = req.body.status;
      if (
        typeof username === 'undefined' ||
        typeof room_id === 'undefined' ||
        typeof status === 'undefined'
      ) {
        res.status(404).json({
          success: false,
          error: 'Bad request',
        });
      }
      const userInfo = await UsersService.changeRoomStatus(
        username,
        room_id,
        status
      );
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  };
}
