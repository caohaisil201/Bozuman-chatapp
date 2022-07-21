/* eslint-disable */
import { Request, Response } from 'express';
import {
  FORGOT_PASSWORD,
  generateSixDigitCode,
  sendCodeToMail,
  ACTIVATE_ACCOUNT,
} from '../utils/Helper.utils';
import { UsersService, User } from '../services/users.service';
import { Email } from '../utils/Mail.utils';

export interface TypedRequestBody<T> extends Request {
  body: T
}

export class Auth {
  public validateSignup = async (data: User) => {
    const checkUsername: User = await UsersService.find({
      username: data.username,
    });
    if (checkUsername) {
      return { success: false, error: 'Username already exist' };
    }

    const checkEmail: User = await UsersService.find({ email: data.email });
    if (checkEmail) {
      return { success: false, error: 'Email already exist' };
    }

    return { success: true };
  };

  public register = async (req: Request, res: Response) => {
    const inputData = req.body as User
    try {
      const validateResult = await this.validateSignup(inputData);
      if (!validateResult.success) {
        res.json(validateResult.error);
      } else {
        const user = await UsersService.create(inputData);
        if (user) {
          const emailAgent = new Email();
          emailAgent.sendEmail(user.email, user.username, ACTIVATE_ACCOUNT);
          res.json('Create account success');
        }
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  public activateAccount = async (req: Request, res: Response) => {
    try {
      const activateResult = await UsersService.activateAccount(
        req.params.name
      );
      res.json(activateResult);
    } catch (err) {
    }
  };

  public signIn = async (req: Request, res: Response) => {
    try {
<<<<<<< HEAD
      const inputData = req.body as User
      const response = await UsersService.authenticate(inputData);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: error.code, message: error.message },
      });
=======
      const input = {
        username: req.body.username,
        password: req.body.password,
      };
      const response = await UsersService.authenticate(input);
      res.status(200).json(response);
    } catch (error:any) {
        res.status(400).json({ success: false, error: {code: error.code, message: error.message} });
>>>>>>> 1b453de1e6e1481f9e8ededd97afa6b4a2f2ca86
    }
  };

  public getUserByEmail = async (req: TypedRequestBody<{email: string}>, res: Response) => {
    try {
      const userEmail = {
        email: req.body.email,
      };

      const user = await UsersService.find(userEmail);
      if (!user.active) {
        res.status(400).json({
          success: false,
          error: {
            code: 'FORGOT_PASSWORD_004',
            message: 'Your account is not verified',
          },
        });
      }
      res.status(200).json({
        success: true,
        email: user.email,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'FORGOT_PASSWORD_003',
          message: error,
        },
      });
    }
  };

  public createCodeExpire = async (req: TypedRequestBody<{email: string}>, res: Response) => {
    try {
      const data = {
        email: req.body.email,
      };
      const code = generateSixDigitCode();
      await UsersService.addCode(data, Number(code));

      await sendCodeToMail(data.email, code, FORGOT_PASSWORD);

      setTimeout(() => {
        (async () => {
          await UsersService.deleteCode(data);
        })
        
      }, 60 * 1000);

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };

  public checkForgotPasswordCode = async (req: TypedRequestBody<{email: string, code: string}>, res: Response) => {
    const codeOfUser = {
      email: req.body.email,
      code: req.body.code,
    };

    try {
      const response = await UsersService.checkCode(codeOfUser);
      res.status(200).json({
        success: true,
        email: response.email,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 'FORGOT_PASSWORD_005',
          message: error,
        },
      });
    }
  };

  public resetPassword = async (req: TypedRequestBody<{email: string, password: string}>, res: Response) => {
    const newPasswordOfUser = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      await UsersService.resetPassword(newPasswordOfUser);
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
  };
}
