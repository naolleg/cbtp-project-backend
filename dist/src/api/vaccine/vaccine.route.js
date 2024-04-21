"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vaccine_controller_js_1 = __importDefault(require("./vaccine.controller.js"));
const vaccineRouter = (0, express_1.Router)();
vaccineRouter.get('/vaccine', vaccine_controller_js_1.default.getAll);
vaccineRouter.post('/vaccine', vaccine_controller_js_1.default.register);
