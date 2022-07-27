import express from 'express';
import { Chat } from '../controllers/chat.controller';

const chatHandler = new Chat();
const router = express.Router();

router.post('/add-new-room', chatHandler.addNewRoom);

export default router;
