"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mother_controller_js_1 = __importDefault(require("./mother.controller.js"));
const motherRouter = (0, express_1.Router)();
motherRouter.post('/', mother_controller_js_1.default.register);
