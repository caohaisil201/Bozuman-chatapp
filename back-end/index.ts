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
import * as jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { UsersService } from './src/services/users.service';

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

const isValidJwt = (token: any) => {
  if (token) {
    jwt.verify(
      token.toString(),
      process.env.SECRET,
      function (err: any, decoded: any) {
        if (err) {
          return false;
        }
      }
    );
    return true;
  } else {
    return false;
  }
};

io.use(function (socket, next) {
  if (socket.handshake.headers && socket.handshake.headers.authorization) {
    const header = socket.handshake.headers['authorization'];
    if (header && isValidJwt(header)) {
      socket.data = jwt_decode(header);
      return next();
    }
  }
});

let socketClientList: any = [];

io.on('connection', (socket) => {
  socketClientList.push({
    socketId: socket.id,
    username: socket.data.username,
  });
  socket.on('joinRoom', (message) => {
    const roomArray = Array.from(socket.rooms);
    roomArray.map((room) => {
      if (!room.toString().includes('SideBar')) {
        socket.leave(room);
      }
    });
    socket.join(message.room);
  });
  socket.on('joinRoomForSideBar', (message) => {
    socket.join('SideBar' + message.room);
  });
  socket.on('chatMessage', (message) => {
    if (socket.data.username) {
      let receivedMessage = {
        content: message.content,
        time: message.time,
        sender: socket.data.username,
        room_id: message.room,
      };
      let invalidMessage = false;
      try {
        const decodeUserToken: any = jwt_decode(message.token);
        if (decodeUserToken.username != socket.data.username) {
          invalidMessage = true;
        }
      } catch (error) {
        invalidMessage = true;
      }
      if (!invalidMessage) {
        RoomsService.insertChatMessageIntoRoom(receivedMessage);
        UsersService.changeOtherUserStatusToUnread(
          socket.data.username,
          message.room
        );
        UsersService.updateLastMessAndLastTime(
          socket.data.username,
          message.room,
          message.content,
          message.time
        );
        UsersService.changeRoomStatus(socket.data.username, message.room, false)
        io.to(message.room).emit('message', receivedMessage);
      }

      setTimeout(() => {
        io.to('SideBar' + message.room).emit(
          'messageForSideBar',
          receivedMessage
        );
      }, 500);
    }
  });
  socket.on('roomUpdate', (message: any) => {
    socketClientList.map((client: any) => {
      if (message.includes(client.username)) {
        io.to(client.socketId).emit('roomUpdater');
      }
    });
  });
  socket.on('roomEdit', (message: any) => {
    io.to(message.room_id).emit('roomEditReceiver', message);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});
