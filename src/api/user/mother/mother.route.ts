import { Router } from "express";
import motherController from "../mother/mother.controller";
import errorHandler from "../../../config/errorHandler";
const motherRoute:Router = Router();

motherRoute.post('/register',errorHandler(motherController.register));
motherRoute.put('/:id',errorHandler(motherController.update));
motherRoute.delete('/:id',errorHandler(motherController.delete));
motherRoute.get('/',errorHandler(motherController.getAll));
motherRoute.get('/:id',errorHandler(motherController.getSingle));


export default motherRoute;