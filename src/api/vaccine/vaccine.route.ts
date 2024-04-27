import { Router } from "express";
import vaccineController from "./vaccine.controller.js";
import errorHandler from "../../config/errorHandler.js";
import { adminAuth,isAdmin,isEmployee } from "../../middleware/auth.js";
const vaccineRoute: Router = Router();

vaccineRoute.get("/", errorHandler(vaccineController.getAll));
vaccineRoute.post("/", errorHandler(vaccineController.register));
vaccineRoute.put("/:id", errorHandler(vaccineController.updatevaccine));
vaccineRoute.get("/:id",errorHandler(vaccineController.getsinglevaccine));
vaccineRoute.delete("/:id", errorHandler(vaccineController.deletevaccine));
export default vaccineRoute;