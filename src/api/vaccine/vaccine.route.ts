import { Router } from "express";
import vaccineController from "./vaccine.controller.js";

const vaccineRoute: Router = Router();



vaccineRoute.get("/vaccine", vaccineController.getAll);
vaccineRoute.post("/vaccine", vaccineController.register);

export default vaccineRoute;