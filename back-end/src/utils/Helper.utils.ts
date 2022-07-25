import {Response} from 'express';
import { Email } from './Mail.utils';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT';

export const generateSixDigitCode = (): string => {
  const number = Math.floor(100000 + Math.random() * 900000);
  return number.toString();
};

export const sendCodeToMail = (email: string, token: string, type: string) => {
  const emailAgent = new Email();
  emailAgent.sendEmail(email, token, type);
};

/**
 * 
 * @param res : response
 * @param status : response status
 * @param errorCode : error Code
 * @param message : error message
 */

export const responseError = (res: Response,status: number, errorCode: string, message: string) : void => {
  if(status >= 400) {
    res.status(status).json({
      success: false,
      error: {
        code: errorCode,
        message,
      }
    })
  }
}