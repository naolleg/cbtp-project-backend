import { Router } from "express";
import vaccineController from "./vaccine.controller.js";
import errorHandler from "../../config/errorHandler.js";
import { adminAuth,isAdmin,isEmployee } from "../../middleware/auth.js";
const vaccineRoute: Router = Router();

vaccineRoute.get("/",[isEmployee], errorHandler(vaccineController.getAll));
vaccineRoute.post("/",[adminAuth], errorHandler(vaccineController.register));
vaccineRoute.put("/:id",[adminAuth], errorHandler(vaccineController.updatevaccine));
vaccineRoute.get("/:id",errorHandler(vaccineController.getsinglevaccine));
vaccineRoute.delete("/:id",[adminAuth], errorHandler(vaccineController.deletevaccine));
export default vaccineRoute;