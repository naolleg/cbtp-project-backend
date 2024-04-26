import { Router } from "express";

import childController from "./child.controller";
import { userAuth } from "../../middleware/auth";
import errorHandler from "../../config/errorHandler.js";

const childRouter:Router = Router();

childRouter.post('/', errorHandler(childController.register));
childRouter.put('/:id', errorHandler(childController.update));
childRouter.delete('/:id', errorHandler(childController.delete));
// Get all children of a specific parent or
childRouter.get('/', errorHandler(childController.getAll));
childRouter.get('/:id', errorHandler(childController.getSingle));
childRouter.get('/mother/:id', errorHandler(childController.getAllByMother));

export default childRouter;