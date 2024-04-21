import { Router } from "express";
import employeeController from "../employee/employee.route";

const employeeRouter:Router = Router();

employeeRouter.post('/employee',employeeController.register);
employeeRouter.get('/employee',employeeController.getAll);

export default employeeRouter;