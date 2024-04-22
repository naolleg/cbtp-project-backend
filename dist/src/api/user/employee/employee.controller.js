"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_route_1 = __importDefault(require("../employee/employee.route"));
const employeeRouter = (0, express_1.Router)();
employeeRouter.post('/employee', employee_route_1.default.register);
employeeRouter.get('/employee', employee_route_1.default.getAll);
exports.default = employeeRouter;
