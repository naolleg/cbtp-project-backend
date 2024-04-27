import { Router } from "express";
import motherController from "../mother/mother.controller";
import errorHandler from "../../../config/errorHandler";
import { isEmployee, isRegistrer } from "../../../middleware/auth";
const motherRoute:Router = Router();

motherRoute.post('/register',[isRegistrer],errorHandler(motherController.register));
motherRoute.put('/:id',[isRegistrer],errorHandler(motherController.update));
motherRoute.delete('/:id',[isRegistrer],errorHandler(motherController.delete));
motherRoute.get('/',[isRegistrer],errorHandler(motherController.getAll));
motherRoute.get('/:id',[isEmployee,isRegistrer],errorHandler(motherController.getSingle));


export default motherRoute;