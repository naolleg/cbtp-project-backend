import { Router } from "express";
const userRouter:Router = Router();
import usersController from "./user.controller.js";
import errorHandler from "../../config/errorHandler.js";
userRouter.use('/login',errorHandler(usersController.loginUser))
userRouter.use("/me",errorHandler(usersController.myInfo))
export default userRouter;