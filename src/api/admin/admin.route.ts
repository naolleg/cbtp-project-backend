import { Router } from "express";
const adminRouter:Router = Router();
import adminController from "./admin.controller.js";
import errorHandler from "../../config/errorHandler.js";
import { adminAuth } from "../../middleware/auth.js";
import { upload } from "../../config/multer.js";

//routes
adminRouter.post("/login",errorHandler(adminController.loginAdmin) );
adminRouter.post("/admin/register",upload.fields([{ name: "attachments", maxCount: 5 }]),errorHandler(adminController.registerAdmin));
adminRouter.get("/",[adminAuth],errorHandler(adminController.myInfo));

export default adminRouter;