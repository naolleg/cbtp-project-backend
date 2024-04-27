import { Router } from "express";
import newsController from "./news.controller.js";
import errorHandler from "../../config/errorHandler.js";    
import { adminAuth, userAuth } from "../../middleware/auth.js";

const newsRoute = Router();

newsRoute.post("/",errorHandler( newsController.createnew));
newsRoute.get("/",errorHandler( newsController.getNews));
newsRoute.put("/:id",errorHandler(newsController.updateNews));
newsRoute.get("/:id",errorHandler(newsController.getsingleNews));
newsRoute.delete("/:id",errorHandler(newsController.deleteNews));
export default newsRoute;