import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { TypedRequestBody } from '../utils/TypeRequestBody.utils';
import _Error from '../utils/Error.utils';

export class User {
  public getUserInfo = async (
    req: Request,
    res: Response
  ) => {
    try{
      const username = req.context?.DecodePayload.username;
      const userInfo = await UsersService.getRoomList(username);
      res.status(200).json(userInfo);
    }catch(error){
      res.status(500).json({
        success: false,
        error,
      })
    }
  }
}