import { Router } from "express";
import employeeController from "../employee/employee.controller";
import errorHandler from "../../../config/errorHandler";
const employeeRoute:Router = Router();

employeeRoute.post('/employee',errorHandler(employeeController.register));
employeeRoute.put('/:id',errorHandler(employeeController.update));
employeeRoute.delete('/employee/:id',errorHandler(employeeController.delete));
employeeRoute.get('/employee',errorHandler(employeeController.getAll));
employeeRoute.get('/employee/:id',errorHandler(employeeController.getSingle));


export default employeeRoute;
