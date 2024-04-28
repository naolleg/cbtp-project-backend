import {Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import errorHandler from "../../config/errorHandler.js";
//import scheduleSchema from "./schedule.schema.js";
import { Router } from "express";

import { adminAuth,isAdmin,isEmployee } from "../../middleware/auth.js";
import scheduleController from "./schedule.controller.js";
const scheduleRoute: Router = Router();



scheduleRoute.post("/", errorHandler(scheduleController.nextschedule));


export default scheduleRoute;