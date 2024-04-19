import adminRoute from "../api/admin/admin.route";
import { Router } from "express";
const appRouter = Router();
appRouter.use("/admin", adminRoute)

export default appRouter;

