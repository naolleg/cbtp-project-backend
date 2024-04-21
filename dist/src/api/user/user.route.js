"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const user_controller_js_1 = __importDefault(require("./user.controller.js"));
userRouter.use('/login', user_controller_js_1.default.loginUser);
exports.default = userRouter;
