import express from 'express';
import { Login, Register } from "../controllers/authController.js";

const authRouter=express.Router();

authRouter.route('/register').post(Register);
authRouter.route('/login').post(Login);

export default authRouter;