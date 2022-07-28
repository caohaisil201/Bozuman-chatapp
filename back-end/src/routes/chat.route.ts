import express from 'express';
import { Chat } from '../controllers/chat.controller';

const chatHandler = new Chat();
const router = express.Router();

router.post('/add-new-room', chatHandler.addNewRoom);
router.post('/insert-message-into-room', chatHandler.insertMessageIntoRoom);
router.post('/get-message-in-room', chatHandler.getMessageInRoomByPage);

export default router;
