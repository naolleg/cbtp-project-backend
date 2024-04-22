import { Router } from "express";
import newsController from "./news.controller.js";

const newsRoute = Router();

newsRoute.post("/news", newsController.createnew);
newsRoute.get("/news", newsController.getNews);
newsRoute.put("/news/:id",newsController.updateNews);
newsRoute.get("/news/:id",newsController.getsingleNews);
newsRoute.delete("/news/:id",newsController.deleteNews);
export default newsRoute;