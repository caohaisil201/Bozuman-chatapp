import { Database } from './src/configs/db.config';
import expiredAccessTokenHandler from './src/middlewares/expiredAccessTokenHandler';
import checkAccessToken from './src/middlewares/checkAccessToken';
import express, { Application } from 'express';
import auth from './src/routes/authentication.route';
import cors from 'cors';

const db = new Database();
db.dbConnect();

const app: Application = express();

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: [
      'http://127.0.0.1:3001',
      'http://localhost:3001',
      'https://bozuman-chatapp-staging.vercel.app',
      'https://bozuman-chatapp.vercel.app',
    ],
    credentials: true,
  })
);

app.use('/api/auth', auth);
app.use('/api/token', expiredAccessTokenHandler);
app.use(checkAccessToken);
app.use('/token', (req, res) => {
  res.json({ success: 'ok', decoded: req.context?.DecodePayload});
});

const port = process.env.PORT || 3000;
app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});
