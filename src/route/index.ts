import adminRoute from "../api/admin/admin.route";
import newsRoute from "../api/news/news.route";
import { Router } from "express";
const appRouter = Router();
appRouter.use("/admin", adminRoute)
appRouter.use("/api",newsRoute)
export default appRouter;

