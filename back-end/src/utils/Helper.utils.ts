import { Response } from 'express';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT';

export const generateSixDigitCode = (): string => {
  const number = Math.floor(100000 + Math.random() * 900000);
  return number.toString();
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