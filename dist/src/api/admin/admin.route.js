"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
const admin_controller_js_1 = __importDefault(require("./admin.controller.js"));
//routes
adminRouter.post("/login", admin_controller_js_1.default.loginAdmin);
exports.default = adminRouter;
