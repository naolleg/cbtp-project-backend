import { Router } from "express";
import vaccinationController from "./vaccination.controller.js";
import errorHandler from "../../config/errorHandler.js";
import { adminAuth,isAdmin,isEmployee } from "../../middleware/auth.js";
const vaccinationRoute: Router = Router();

vaccinationRoute.get("/", errorHandler(vaccinationController.getAllvaccination));
vaccinationRoute.post("/", errorHandler(vaccinationController.vaccinate));
vaccinationRoute.get("/:id",errorHandler(vaccinationController.getsinglevaccination));

export default vaccinationRoute;