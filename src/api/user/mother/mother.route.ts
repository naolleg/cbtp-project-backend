import { Router } from "express";
import motherController from "../mother/mother.controller";
import errorHandler from "../../../config/errorHandler";
const motherRoute:Router = Router();

motherRoute.post('/mother',errorHandler(motherController.register));
motherRoute.put('/:id',errorHandler(motherController.update));
motherRoute.delete('/mother/:id',errorHandler(motherController.delete));
motherRoute.get('/mother',errorHandler(motherController.getAll));
motherRoute.get('/mother/:id',errorHandler(motherController.getSingle));


export default motherRoute;