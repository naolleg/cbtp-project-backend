import { NextFunction, Request, Response } from "express";
import newsSchema from "./news.schema.js";
import { prisma } from "../../config/prisma.js";


const newsController = {
  //create news
   createnew: async (req:Request,res:Response,nex:NextFunction)=>{
      newsSchema.createnew.parse(req.body);
      const theNewNews = await prisma.news.create({data: req.body})
      res.status(200).json(theNewNews);
   },
   
   //get public news
   getNews:async (req:Request,res:Response,nex:NextFunction)=>{
    const news = await prisma.news.findMany({
      orderBy:{
        publication_date:"desc"
      },
    
    });
    
    return res.status(200).json(news);

   },
   
  
}



export default newsController;