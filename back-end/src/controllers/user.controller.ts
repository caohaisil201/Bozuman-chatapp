import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import _Error from '../utils/Error.utils';

export class User {
  public getUserInfo = async (
    req: Request,
    res: Response
  ) => {
    try{
      const username = req.context?.DecodePayload.username;
      const userInfo = await UsersService.getUserInfo(username);
      console.log(userInfo);
      res.status(200).json({
        success: true,
        data: userInfo,
      });
    }catch(error){
      res.status(500).json({
        success: false,
        error,
      })
    }
  }
}