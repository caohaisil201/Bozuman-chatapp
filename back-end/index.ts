import { createServer } from 'http';
import { Server } from 'socket.io';
import { Database } from './src/configs/db.config';
import expiredAccessTokenHandler from './src/middlewares/expiredAccessTokenHandler';
import checkAccessToken from './src/middlewares/checkAccessToken';
import express, { Application } from 'express';
import auth from './src/routes/authentication.route';
import chat from './src/routes/chat.route';
import user from './src/routes/user.route';
import cors from 'cors';
import 'dotenv/config';
import { RoomsService } from './src/services/rooms.service';

const db = new Database();
db.dbConnect();

const app: Application = express();
const server = createServer(app);

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/api/chat', checkAccessToken, chat);
app.use('/api/user', checkAccessToken, user);
app.use('/', checkAccessToken, (req, res) => {
  res.status(200).json({
    error: false,
  });
});

const io = new Server(server, {
  cors: {
    origin: [
      'http://127.0.0.1:3001',
      'http://localhost:3001',
      'https://bozuman-chatapp-staging.vercel.app',
      'https://bozuman-chatapp.vercel.app',
    ],
    credentials: false,
  },
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (message) => {
    socket.join(message.room);
  });
  socket.on('chatMessage', (message) => {
    let receivedMessage = {
      content: message.content,
      time: message.time,
      sender: message.sender,
      room_id: message.room,
    };
    io.to(message.room).emit('message', receivedMessage);
    RoomsService.insertChatMessageIntoRoom(receivedMessage);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});
