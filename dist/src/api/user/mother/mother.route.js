"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mother_controller_1 = __importDefault(require("../mother/mother.controller"));
const motherRoute = (0, express_1.Router)();
motherRoute.post('/mother', mother_controller_1.default.register);
motherRoute.put('/:id', mother_controller_1.default.update);
motherRoute.delete('/mother/:id', mother_controller_1.default.delete);
motherRoute.get('/mother', mother_controller_1.default.getAll);
motherRoute.get('/mother/:id', mother_controller_1.default.getSingle);
exports.default = motherRoute;
