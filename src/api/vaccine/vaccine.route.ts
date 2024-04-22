import { Router } from "express";
import vaccineController from "./vaccine.controller.js";
import errorHandler from "../../config/errorHandler.js";
const vaccineRoute: Router = Router();

vaccineRoute.get("/vaccine", errorHandler(vaccineController.getAll));
vaccineRoute.post("/vaccine", errorHandler(vaccineController.register));
vaccineRoute.put("/vaccine/:id",errorHandler(vaccineController.updatevaccine));
vaccineRoute.get("/vaccine/:id",errorHandler(vaccineController.getsinglevaccine));
vaccineRoute.delete("/vaccine/:id",errorHandler(vaccineController.deletevaccine));
export default vaccineRoute;