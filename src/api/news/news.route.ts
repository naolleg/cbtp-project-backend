import { Router } from "express";
import newsController from "./news.controller.js";
import errorHandler from "../../config/errorHandler.js";

const newsRoute = Router();

newsRoute.post("/news",errorHandler( newsController.createnew));
newsRoute.get("/news",errorHandler( newsController.getNews));
newsRoute.put("/news/:id",errorHandler(newsController.updateNews));
newsRoute.get("/news/:id",errorHandler(newsController.getsingleNews));
newsRoute.delete("/news/:id",errorHandler(newsController.deleteNews));
export default newsRoute;