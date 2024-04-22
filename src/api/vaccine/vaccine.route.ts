import { Router } from "express";
import vaccineController from "./vaccine.controller.js";

const vaccineRoute: Router = Router();

vaccineRoute.get("/vaccine", vaccineController.getAll);
vaccineRoute.post("/vaccine", vaccineController.register);
vaccineRoute.put("/vaccine/:id",vaccineController.updatevaccine);
vaccineRoute.get("/vaccine/:id",vaccineController.getsinglevaccine);
vaccineRoute.delete("/vaccine/:id",vaccineController.deletevaccine);
export default vaccineRoute;