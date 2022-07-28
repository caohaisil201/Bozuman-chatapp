import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import 'dotenv/config';

const checkAccessToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(
      token.toString(),
      process.env.SECRET,
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
