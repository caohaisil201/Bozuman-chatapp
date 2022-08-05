import express from 'express';
import { Chat } from '../controllers/chat.controller';
import { createValidator } from 'express-joi-validation'
import { editRoomsSchema, roomsSchema } from '../models/rooms.model'
const chatHandler = new Chat();
const router = express.Router();
const validator = createValidator({
  passError: true,
});

router.post('/add-new-room', validator.body(roomsSchema), chatHandler.addNewRoom); 
router.get('/room-info', chatHandler.getRoomInfo);
router.post('/edit-room',validator.body(editRoomsSchema), chatHandler.postEditRoom);
router.get('/get-message-in-room', chatHandler.getMessageInRoomByPage);
router.get('/get-newest-message-bucket', chatHandler.getNewestMessageBucket);

export default router;
