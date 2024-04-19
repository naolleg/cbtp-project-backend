import { Router } from "express";

import newsController from "./news.controller.js";
const newsRouter = Router();
newsRouter.post("news",newsController.createnew);
newsRouter.get("/news",newsController.getNews);