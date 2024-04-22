"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("../employee/employee.controller"));
const employeeRoute = (0, express_1.Router)();
employeeRoute.post('/employee', employee_controller_1.default.register);
employeeRoute.put('/:id', employee_controller_1.default.update);
employeeRoute.delete('/employee/:id', employee_controller_1.default.delete);
employeeRoute.get('/employee', employee_controller_1.default.getAll);
employeeRoute.get('/employee/:id', employee_controller_1.default.getSingle);
exports.default = employeeRoute;
