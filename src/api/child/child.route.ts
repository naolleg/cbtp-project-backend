import { Router } from "express";

import childController from "./child.controller";
import { isEmployee } from "../../middleware/auth";
import errorHandler from "../../config/errorHandler.js";

const childRouter:Router = Router();

childRouter.post('/', errorHandler(childController.register));
childRouter.put('/:id',[isEmployee], errorHandler(childController.update));
childRouter.delete('/:id',[isEmployee], errorHandler(childController.delete));
// Get all children of a specific parent or
childRouter.get('/',[isEmployee],errorHandler(childController.getAll));
childRouter.get('/:id',[isEmployee], errorHandler(childController.getSingle));
childRouter.get('/mother/:id',[isEmployee], errorHandler(childController.getAllByMother));

export default childRouter;