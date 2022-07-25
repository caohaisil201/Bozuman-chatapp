// eslint-disable-next-line no-unused-vars
import { Express } from 'express-serve-static-core';

interface DecodePayload {
  userId: string;
  iat: string;
  exp: string;
}
interface Context {
  DecodePayload: DecodePayload;
}
declare module 'express-serve-static-core' {
  interface Request {
    context?: Context;
  }
}
