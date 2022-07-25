/* eslint-disable @typescript-eslint/no-misused-promises*/
import express from 'express';
import {createValidator} from 'express-joi-validation'
import { Auth } from '../controllers/authentication.controller'
import { registerSchema, signInSchema } from '../models/users.model'

const authentication = new Auth();
const router = express.Router();
const validator = createValidator({
  passError: true,
});

router.post(
  '/register',
  validator.body(registerSchema),
  authentication.register
);
router.get('/activate_account/:name', authentication.activateAccount);
router.post('/sign-in',validator.body(signInSchema), authentication.signIn);

router.post('/forgot-password', authentication.forgotPassword);
router.post('/create-code', authentication.createCodeExpire);
router.post('/check-code', authentication.checkForgotPasswordCode);
router.post('/reset-password', authentication.resetPassword);


export default router;
