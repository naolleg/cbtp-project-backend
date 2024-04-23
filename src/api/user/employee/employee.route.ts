import { Router } from "express";
import employeeController from "../employee/employee.controller";
import errorHandler from "../../../config/errorHandler";
const employeeRoute:Router = Router();

employeeRoute.post('/',errorHandler(employeeController.register));
employeeRoute.put('/:id',errorHandler(employeeController.update));
employeeRoute.delete('/:id',errorHandler(employeeController.delete));
employeeRoute.get('/',errorHandler(employeeController.getAll));
employeeRoute.get('/:id',errorHandler(employeeController.getSingle));


export default employeeRoute;
