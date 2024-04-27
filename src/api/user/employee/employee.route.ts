import { Router } from "express";
import employeeController from "../employee/employee.controller";
import errorHandler from "../../../config/errorHandler";
import { adminAuth } from "../../../middleware/auth";
const employeeRoute:Router = Router();

employeeRoute.post('/register',[adminAuth],errorHandler(employeeController.register));
employeeRoute.put('/:id',[adminAuth],errorHandler(employeeController.update));
employeeRoute.delete('/:id',[adminAuth],errorHandler(employeeController.delete));
employeeRoute.get('/',[adminAuth],errorHandler(employeeController.getAll));
employeeRoute.get('/:id',[adminAuth],errorHandler(employeeController.getSingle));


export default employeeRoute;
