/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import * as jwt from 'jsonwebtoken';
import _CONF from '../configs/auth.config';
import express from 'express';

export interface DecodePayload extends jwt.JwtPayload{
  username: string;
  iat: number;
  exp: number;
}

export interface RequestWithToken extends express.Request {
  decoded: DecodePayload ;
}

export const checkAccessToken =
  () => (
    req: RequestWithToken,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const token = req.headers['x-access-token'];
    // TODO: fix this typescript error
    if (token) {
      jwt.verify(
        token.toString(),
        _CONF.SECRET,
        function (err: any, decoded: any) {
          if (err) {
            return res
              .status(401)
              .json({ error: true, message: 'Unauthorized access.', err });
          }
          req.decoded = decoded;
          next();
        }
      );
    } else {
      return res.status(403).send({
        error: true,
        message: 'No token provided.',
      });
    }
  };
