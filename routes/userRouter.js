import express from 'express';
import { Login, SignUp } from '../controller/userController.js';

const userRouter =express.Router();

userRouter.post('/adduser',SignUp)
userRouter.post('/login',Login)


export default userRouter