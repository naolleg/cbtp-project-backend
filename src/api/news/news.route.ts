import { Router } from "express";
import newsController from "./news.controller.js";

const newsRoute = Router();

newsRoute.post("/news", newsController.createnew);

newsRoute.get("/news", newsController.getNews);

export default newsRoute;