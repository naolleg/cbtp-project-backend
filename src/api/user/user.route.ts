import { Router } from "express";
const userRouter:Router = Router();
import usersController from "./user.controller.js";
userRouter.use('/login',usersController.loginUser)
export default userRouter;