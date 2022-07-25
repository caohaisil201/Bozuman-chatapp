/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import * as jwt from 'jsonwebtoken';
import _CONF from '../configs/auth.config';
import { UsersService } from '../services/users.service';
import express from 'express';
import {  RequestWithToken } from './checkAccessToken';

export const expiredAccessTokenHandler =
  () => (
    req: RequestWithToken,
    res: express.Response,
  ) => {
    const refreshToken = req.headers['x-refresh-token'];
    // TODO: fix this typescript error
    if (refreshToken) {
      jwt.verify(
        refreshToken.toString(),
        _CONF.SECRET_REFRESH,
        function (err: any, decoded: any) {
          if (err) {
            return res
              .status(401)
              .json({ error: true, message: 'Unauthorized access.', err });
          }
          const { username } = decoded;
          const accessToken = UsersService.generateAccessToken(username);
          res.status(200).json({
            success: true,
            accessToken,
            refreshToken: refreshToken,
          });
        }
      );
    } else {
      return res.status(403).send({
        error: true,
        message: 'No token provided.',
      });
    }
  };
