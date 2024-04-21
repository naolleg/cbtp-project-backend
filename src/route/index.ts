import adminRoute from "../api/admin/admin.route";
import newsRoute from "../api/news/news.route";
import vaccineRoute from "../api/vaccine/vaccine.route";
import { Router } from "express";
// Middleware function

const appRouter = Router();
appRouter.use("/admin", adminRoute)
appRouter.use("/api",newsRoute)
appRouter.use("/api",vaccineRoute)
export default appRouter;


  