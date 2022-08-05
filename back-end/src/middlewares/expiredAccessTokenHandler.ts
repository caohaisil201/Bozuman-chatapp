import * as jwt from 'jsonwebtoken';
import { UsersService } from '../services/users.service';
import express from 'express';
import 'dotenv/config';

const expiredAccessTokenHandler = (
  req: express.Request,
  res: express.Response
) => {
  const refreshToken = req.headers['x-refresh-token'];
  if (refreshToken) {
    jwt.verify(
      refreshToken.toString(),
      process.env.SECRET_REFRESH,
      function (err: any, decoded: any) {
        if (err) {
          return res
            .status(401)
            .json({ error: true, message: 'Refresh token expire', err });
        }
        const { username } = decoded;
        const accessToken = UsersService.generateAccessToken(username);
        res.status(200).json({
          success: true,
          accessToken,
        });
      }
    );
  } else {
    return res.status(403).send({
      error: true,
      message: 'No refresh token provided',
    });
  }
};
export default expiredAccessTokenHandler;
