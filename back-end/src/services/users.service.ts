/* eslint-disable camelcase */
import { Users } from '../models/users.model';
import * as jwt from 'jsonwebtoken';
import _CONF from '../configs/auth.config';
import { RefreshToken } from '../models/refreshToken.model';
import crypto from 'crypto';
import md5 from 'md5';

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
        password: data.password,
        full_name: data.full_name,
        email: data.email,
      };
      const response = await new Users(user).save();
      return response;
    } catch (error) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  static find = async (data: { username?: string; email?: string }) => {
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
      return {success: true, message: 'Activate account success'};
    } catch (error) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.log(error);
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

  static addCode = async (data: { email: string }, code: number) => {
    const userEmail = data.email;
    const doc = await Users.findOneAndUpdate(
      { email: userEmail },
      { code: code },
      { new: true }
    );
    if (!doc) {
      throw 'Internal server error';
    }
    return doc;
  };

  static deleteCode = async (data: { email: string }) => {
    const userEmail = data.email;
    const user = await Users.findOne({ email: userEmail });
    if (user) {
      user.code = undefined;
      return user.save();
    }
    throw 'Internal server error';
  };

  static checkCode = async (data: { email: string; code: string }) => {
    const email = data.email;
    const code = data.code;
    const user = await Users.findOne({
      email: email,
      code: code,
    });

    if(!user) {
      throw {
        code: 'FORGOT_PASSWORD_005',
        message: 'Your code is incorrect'
      };
    }
    return user;
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
        message: 'Your account does not exist'
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  static generateAccessToken = (username: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return jwt.sign({ username: username }, _CONF.SECRET, {
      expiresIn: _CONF.tokenLife,
    });
  };

  static generateRefreshToken = (username: string) => {
    return new RefreshToken({
      username: username,
      token: jwt.sign(
        { randomString: this.randomTokenString() },
        _CONF.SECRET_REFRESH,
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
