import { Router } from "express";
import motherController from "../mother/mother.controller";

const motherRoute:Router = Router();

motherRoute.post('/mother',motherController.register);
motherRoute.put('/:id',motherController.update);
motherRoute.delete('/mother/:id',motherController.delete);
motherRoute.get('/mother',motherController.getAll);
motherRoute.get('/mother/:id',motherController.getSingle);


export default motherRoute;