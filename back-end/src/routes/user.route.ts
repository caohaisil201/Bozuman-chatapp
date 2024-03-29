import express from "express";
import { User } from '../controllers/user.controller';

const user = new User();
const router = express.Router();

router.get('/user-info', user.getUserInfo);
router.get('/search-user', user.getSearchUserResult);
router.post('/change-room-status', user.changeRoomStatus)

export default router;