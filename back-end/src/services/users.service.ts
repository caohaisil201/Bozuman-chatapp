import { Users } from '../models/users.model';
import * as jwt from 'jsonwebtoken';
import _CONF from '../configs/auth.config';
import { RefreshToken } from '../models/refreshToken.model';
import crypto from 'crypto';
import md5 from 'md5';
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
  // TODO: Change room_list types
  room_list?: Array<string>;
}

export class UsersService {
  static create = async (data: User) => {
    try {
      const user = {
        username: data.username,
        password: md5(data.password),
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

  static activateAccount = async (userName: string) => {
    try {
      await Users.findOneAndUpdate(
        { username: userName },
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
    if (!user || md5(password) != user.password) {
      throw {
        code: 'SIGN_IN_007',
        message: 'Username or password is incorrect',
      };
    }
    if (!user.active) {
      throw {
        code: 'SIGN_IN_008',
        message: 'Your account is inactive',
      };
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
      throw 'New password must not be the same as the old password';
    }

    user = await Users.findOne({
      email,
    });
    if (user) {
      user.password = md5(password);
      return await user.save();
    } else {
      throw {
        code: 'FORGOT_PASSWORD_014',
        message: 'Your account does not exist',
      };
    }
  };

  static generateAccessToken = (username: any) => {
    return jwt.sign({ username: username }, process.env.SECRET, {
      expiresIn: _CONF.tokenLife,
    });
  };

  static generateRefreshToken = (username: string) => {
    return new RefreshToken({
      username: username,
      token: jwt.sign(
        { username: username, randomString: this.randomTokenString() },
        process.env.SECRET_REFRESH,
        {
          expiresIn: _CONF.refreshTokenLife,
        }
      ),
    });
  };
  
  static randomTokenString = () => {
    return crypto.randomBytes(40).toString('hex');
  };
}
