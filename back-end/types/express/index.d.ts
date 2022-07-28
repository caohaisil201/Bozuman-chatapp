import { Express } from 'express-serve-static-core';

interface DecodePayload {
  username: string;
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
