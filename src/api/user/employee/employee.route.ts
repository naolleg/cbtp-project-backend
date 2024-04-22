import { Router } from "express";
import employeeController from "../employee/employee.controller";

const employeeRoute:Router = Router();

employeeRoute.post('/employee',employeeController.register);
employeeRoute.put('/:id',employeeController.update);
employeeRoute.delete('/employee/:id',employeeController.delete);
employeeRoute.get('/employee',employeeController.getAll);
employeeRoute.get('/employee/:id',employeeController.getSingle);


export default employeeRoute;
