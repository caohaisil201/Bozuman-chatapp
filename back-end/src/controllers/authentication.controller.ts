import { Request, Response } from 'express';
import _CONF from '../configs/auth.config';
import {
  FORGOT_PASSWORD,
  ACTIVATE_ACCOUNT,
} from '../utils/Helper.utils';
import { HashClass } from '../utils/Hash.util';
import { UsersService, User } from '../services/users.service';
import { Email } from '../utils/Mail.utils';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface ErrorObj {
  code: string;
  message: string;
}

export class Auth {
  public validateSignup = async (data: User) => {
    const user = await UsersService.find(data);
    if (!user) {
      return { success: true };
    }
    if (user.username === data.username) {
      return {
        success: false,
        error: 'Username already exist',
        errorCode: 'SIGN_UP_009',
      };
    } else if (user.email === data.email) {
      return {
        success: false,
        error: 'Email already exist',
        errorCode: 'SIGN_UP_010',
      };
    }

    return { success: true };
  };

  public register = async (
    req: TypedRequestBody<{
      username: string;
      password: string;
      email: string;
      full_name: string;
    }>,
    res: Response
  ) => {
    const inputData = { ...req.body, password: md5(req.body.password) } as User;
    try {
      const validateResult = await this.validateSignup(inputData);
      if (!validateResult.success) {
        res.status(400).json({
          success: false,
          error: {
            code: validateResult.errorCode,
            message: validateResult.error,
          },
        });
      } else {
        const user = await UsersService.create(inputData);
        if (user) {
          const emailAgent = new Email();
          emailAgent.sendEmail(
            user.email,
            HashClass.encode(user.username),
            ACTIVATE_ACCOUNT
          );
          res.status(200).json({ success: true });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  public activateAccount = async (req: Request, res: Response) => {
    try {
      const username = HashClass.decode(req.params.name);
      if (username == '@Wrong user token') {
        res
          .status(400)
          .json({ success: false, message: 'Wrong activate link' });
      }
      const activateResult = await UsersService.activateAccount(username);
      res.status(200).json(activateResult);
    } catch (error) {
      //TO DO
    }
  };

  public signIn = async (req: Request, res: Response) => {
    try {
      const inputData = req.body as User;
      const response = await UsersService.authenticate(inputData);
      res.status(200).json(response);
    } catch (error) {
      const err = error as ErrorObj;
      res.status(400).json({
        success: false,
        error: { code: err.code, message: err.message },
      });
    }
  };

  public forgotPassword = async (
    req: TypedRequestBody<{ email: string }>,
    res: Response
  ) => {
    try {
      const userEmail = {
        email: req.body.email,
      };

      const user = await UsersService.find(userEmail);

      if (!user) {
        res.status(400).json({
          success: false,
          error: {
            code: 'FORGOT_PASSWORD_003',
            message: 'Your account is not exists',
          },
        });
      } else {
        if (!user.active) {
          res.status(400).json({
            success: false,
            error: {
              code: 'FORGOT_PASSWORD_004',
              message: 'Your account is not verified',
            },
          });
        }

        const token = jwt.sign({ email: user.email }, _CONF.SECRET, {
          expiresIn: '1m',
        });

        const emailAgent = new Email();
        emailAgent.sendEmail(user.email, token, FORGOT_PASSWORD);

        res.status(200).json({
          success: true,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: {
          code: '500',
          message: 'Internal server error',
        },
      });
    }
  };

  public resetPassword = (
    req: TypedRequestBody<{ token: string; password: string }>,
    res: Response
  ) => {
    const token = req.body.token;
    let email: string | undefined;

    jwt.verify(token, _CONF.SECRET, function (err: any, decoded: any) {
      if (err) {
        //TODO: fix deocoded type
        /* eslint-disable @typescript-eslint/no-unsafe-assignment*/
        /* eslint-disable @typescript-eslint/no-unsafe-member-access*/
        if (err.message === 'jwt malformed' || decoded === undefined) {
          return res.status(400).json({
            success: false,
            error: {
              code: 'FORGOT_PASSWORD_005',
              message: 'This link does not exists',
            },
          });
        } else if (err.message === 'jwt expired') {
          return res.status(400).json({
            success: false,
            error: {
              code: 'FORGOT_PASSWORD_006',
              message: 'Your link is expired',
            },
          });
        }
      }
      try {
        email = decoded.email;
        const newPasswordOfUser: User = {
          username: '',
          email,
          password: req.body.password,
        };
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => await UsersService.resetPassword(newPasswordOfUser))();
        res.status(200).json({
          success: true,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: {
            code: 'FORGOT_PASSWORD_010',
            message: error,
          },
        });
      }
    });
  };
}
