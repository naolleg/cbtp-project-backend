"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vaccine_controller_js_1 = __importDefault(require("./vaccine.controller.js"));
const vaccineRoute = (0, express_1.Router)();
vaccineRoute.get("/vaccine", vaccine_controller_js_1.default.getAll);
vaccineRoute.post("/vaccine", vaccine_controller_js_1.default.register);
vaccineRoute.put("/vaccine/:id", vaccine_controller_js_1.default.updatevaccine);
vaccineRoute.get("/vaccine/:id", vaccine_controller_js_1.default.getsinglevaccine);
vaccineRoute.delete("/vaccine/:id", vaccine_controller_js_1.default.deletevaccine);
exports.default = vaccineRoute;
