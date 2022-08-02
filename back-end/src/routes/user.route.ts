import express from "express";
import { User } from '../controllers/user.controller';

const user = new User();
const router = express.Router();

router.get('/user-info', user.getUserInfo);
router.post('/insert-room')

export default router;