import { Router } from "express";
import employeeController from "../employee/employee.controller";
import errorHandler from "../../../config/errorHandler";
import { adminAuth } from "../../../middleware/auth";
import { upload } from "../../../config/multer";
const employeeRoute:Router = Router();

employeeRoute.post('/employee/register',upload.fields([{ name: "attachments", maxCount: 5 }]),errorHandler(employeeController.register));
employeeRoute.put('/:id',errorHandler(employeeController.update));
employeeRoute.delete('/:id',errorHandler(employeeController.delete));
employeeRoute.get('/',errorHandler(employeeController.getAll));
employeeRoute.get('/:id',errorHandler(employeeController.getSingle));


export default employeeRoute;
