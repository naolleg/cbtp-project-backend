import { Router } from "express";
import vaccineController from "./vaccine.controller.js";

const vaccineRouter:Router = Router();

vaccineRouter.get('/vaccine', vaccineController.getAll);
vaccineRouter.post('/vaccine',vaccineController.register);