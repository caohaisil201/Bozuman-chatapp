import * as jwt from 'jsonwebtoken';
import _CONF from '../configs/auth.config';
import * as express from 'express';

const checkAccessToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(
      token.toString(),
      _CONF.SECRET,
      function (err: any, decoded: any) {
        if (err) {
          return res
            .status(401)
            .json({ error: true, message: 'Unauthorized access', err });
        }
        req.context = { ...req.context, DecodePayload: decoded };
        
        next();
      }
    );
  } else {
    return res.status(403).send({
      error: true,
      message: 'No token provided',
    });
  }
};
export default checkAccessToken;
