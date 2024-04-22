import adminRoute from "../api/admin/admin.route";
import newsRoute from "../api/news/news.route";
import employeeRoute from "../api/user/employee/employee.route";
import vaccineRoute from "../api/vaccine/vaccine.route";
import motherRoute from "../api/user/mother/mother.route";
import { Router } from "express";
import userRouter from "../api/user/user.route";
// Middleware function

const appRouter = Router();
appRouter.use("/admin", adminRoute)
appRouter.use("/api",newsRoute)
appRouter.use("/api",vaccineRoute)
appRouter.use("/api",employeeRoute)
appRouter.use("/api",motherRoute)
appRouter.use("/api",userRouter)
export default appRouter;


  