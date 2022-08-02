import express from 'express';
import { Chat } from '../controllers/chat.controller';

const chatHandler = new Chat();
const router = express.Router();

// TODO
router.post('/add-new-room', chatHandler.addNewRoom); 

router.get('/get-message-in-room', chatHandler.getMessageInRoomByPage);
router.get('/get-newest-message-bucket', chatHandler.getNewestMessageBucket);
export default router;
