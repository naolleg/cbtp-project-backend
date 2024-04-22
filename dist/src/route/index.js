"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_route_1 = __importDefault(require("../api/admin/admin.route"));
const news_route_1 = __importDefault(require("../api/news/news.route"));
const employee_route_1 = __importDefault(require("../api/user/employee/employee.route"));
const vaccine_route_1 = __importDefault(require("../api/vaccine/vaccine.route"));
const mother_route_1 = __importDefault(require("../api/user/mother/mother.route"));
const express_1 = require("express");
const user_route_1 = __importDefault(require("../api/user/user.route"));
// Middleware function
const appRouter = (0, express_1.Router)();
appRouter.use("/admin", admin_route_1.default);
appRouter.use("/api", news_route_1.default);
appRouter.use("/api", vaccine_route_1.default);
appRouter.use("/api", employee_route_1.default);
appRouter.use("/api", mother_route_1.default);
appRouter.use("/api", user_route_1.default);
exports.default = appRouter;
