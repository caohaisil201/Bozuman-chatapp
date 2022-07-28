export interface ErrorObj {
  code: string;
  message: string;
}

export default class Error {
  static SERVER_ERROR = {
    code: '500',
    message: 'Internal server error',
  }

  static SIGN_IN_007 = {
    code: 'SIGN_IN_007',
    message: 'Username or password is incorrect',
  }

  static SIGN_IN_008 = {
    code: 'SIGN_IN_008',
    message: 'Your account is inactive',
  }

  static SIGN_UP_009 = {
    code: 'SIGN_UP_009',
    message: 'Username already exist',
  }

  static SIGN_UP_010 = {
    code: 'SIGN_UP_009',
    message: 'Email already exist',
  }

  static FORGOT_PASSWORD_003 = {
    code: 'FORGOT_PASSWORD_003',
    message: 'Your account is not exists'
  }

  static FORGOT_PASSWORD_004 = {
    code: 'FORGOT_PASSWORD_004',
    message: 'Your account is not verified'
  }

  static FORGOT_PASSWORD_005 = {
    code: 'FORGOT_PASSWORD_005',
    message: 'This link does not exists'
  }

  static FORGOT_PASSWORD_006 = {
    code: 'FORGOT_PASSWORD_006',
    message: 'Your link is expired'
  }
  
  static FORGOT_PASSWORD_010 = {
    code: 'FORGOT_PASSWORD_010',
    message: 'New password must not be the same as the old password'
  }

  static FORGOT_PASSWORD_014 = {
    code: 'FORGOT_PASSWORD_014',
    message: 'Your account does not exist',
  }
}
