import adminRoute from "../api/admin/admin.route";
import newsRoute from "../api/news/news.route";
import employeeRoute from "../api/user/employee/employee.route";
import vaccineRoute from "../api/vaccine/vaccine.route";
import motherRoute from "../api/user/mother/mother.route";
import { Router } from "express";
import userRouter from "../api/user/user.route";
import childRouter from "../api/child/child.route";
// Middleware function

const appRouter = Router();
appRouter.use("/child",childRouter)
appRouter.use("/admin", adminRoute)
appRouter.use("/news",newsRoute)
appRouter.use("/vaccine",vaccineRoute)
appRouter.use("/employee",employeeRoute)
appRouter.use("/mother",motherRoute)
appRouter.use("/user",userRouter)
export default appRouter;


  