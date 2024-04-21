"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_js_1 = __importDefault(require("./news.controller.js"));
const newsRoute = (0, express_1.Router)();
newsRoute.post("/news", news_controller_js_1.default.createnew);
newsRoute.get("/news", news_controller_js_1.default.getNews);
exports.default = newsRoute;
