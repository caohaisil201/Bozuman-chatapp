import { Users } from '../models/users.model';
import * as jwt from 'jsonwebtoken';
import _CONF from '../configs/auth.config';
import { RefreshToken } from '../models/refreshToken.model';
import _Error from '../utils/Error.utils';
import crypto from 'crypto';
import 'dotenv/config';

export interface User {
  username: string;
  password: string;
  full_name?: string;
  email?: string;
  active?: boolean;
  _id?: any;
  birth_day?: Date;
  gender?: boolean;
  phone?: string;
  avatar?: string;
  description?: string;
  code?: string;
  room_list?: Array<{
    room_id: number;
    name: string;
    type: string;
    last_mess: string;
    last_time: Date;
    unread: boolean;
  }>;
}

export class UsersService {
  static generateAccessToken = (username: any) => {
    return jwt.sign({ username: username }, process.env.SECRET, {
      expiresIn: _CONF.TOKEN_LIFE,
    });
  };

  static generateRefreshToken = (username: string) => {
    return new RefreshToken({
      username: username,
      token: jwt.sign(
        { username: username, randomString: this.randomTokenString() },
        process.env.SECRET_REFRESH,
        {
          expiresIn: _CONF.REFRESH_TOKEN_LIFE,
        }
      ),
    });
  };
  
  static randomTokenString = () => {
    return crypto.randomBytes(40).toString('hex');
  };

  static create = async (data: User) => {
    try {
      const user = {
        username: data.username,
        password: data.password,
        full_name: data.full_name,
        email: data.email,
      };
      const response = await new Users(user).save();
      return response;
    } catch (error) {
      throw error;
    }
  };

  static checkUserExist = async (data: { username?: string; email?: string }) => {
    const user = await Users.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    }).exec();
    return user;
  };

  static activateAccount = async (username: string) => {
    try {
      await Users.findOneAndUpdate(
        { username: username },
        { active: true }
      ).exec();
      return { success: true, message: 'Activate account success' };
    } catch (error) {
      throw error;
    }
  };

  static authenticate = async (data: User) => {
    const { username, password } = data;
    const user = await Users.findOne({ username: username }).exec();
    if (!user || password != user.password) {
      throw _Error.SIGN_IN_007
    }
    if (!user.active) {
      throw _Error.SIGN_IN_008
    }
    const accessToken = this.generateAccessToken(user.username);
    const refreshToken = this.generateRefreshToken(user.username);
    await refreshToken.save();
    return {
      success: true,
      accessToken,
      refreshToken: refreshToken.token,
    };
  };

  static resetPassword = async (data: User) => {
    const email = data.email;
    const password = data.password;
    let user = await Users.findOne({
      email,
      password,
    });
    if (user) {
      throw _Error.FORGOT_PASSWORD_010
    }

    user = await Users.findOne({
      email,
    });
    if (user) {
      user.password = password;
      return await user.save();
    } else {
      throw _Error.FORGOT_PASSWORD_014
    }
  };

  static getUserInfo = async (username: string | undefined) => {
    if(username){
      return await Users.findOne({username: username}).select(['-password','-_id', '-active']).exec();
    }
    throw _Error.SERVER_ERROR;
  }

  static getSearchUserResult = async (searchValue: string | undefined) => {
    if(searchValue){
      
      return await Users.find({username: { $regex: searchValue, $options: 'i'}}).select(['username', '-_id']).exec();
    }
    throw _Error.SERVER_ERROR;
  }
}
