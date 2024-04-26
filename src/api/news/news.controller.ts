import {Request, Response } from "express";
import newsSchema from "./news.schema.js";
import { prisma } from "../../config/prisma.js";
import { log } from "console";


const newsController = {
  //create news
   createnew: async (req:Request,res:Response)=>{
      newsSchema.createnew.parse(req.body);
      console.log("assds");
      const theNewNews = await prisma.news.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          publication_date: new Date(),
          image_url: req.body.image_url,
          adminId: req.body.adminId
        }
       
       });
      res.status(200).json(theNewNews);
   },
   
   //get public news
   getNews:async (req:Request,res:Response)=>{
    const news = await prisma.news.findMany({
      orderBy:{
        publication_date:"desc"
      },
      include:{
        admin:{
          include:{
            
          }
        }
      }
    
    });
    
    return res.status(200).json(news);

   },
    //update news
    updateNews: async (req:Request,res:Response)=>{
      
      req.newsId=+req.params.id;
      newsSchema.updateNews.parse(req.body);
   
      const foundNews=await prisma.news.findFirst({
        where:{
          id: +req.newsId
        }
      });
    
      if (!foundNews) {
        return res.status(404).json({ error: 'News not found' });
      }

      // Update the news using req.body
      const  updatedNews = await prisma.news.update({
        data: {
          title: req.body.title,
          description: req.body.description,
          publication_date: new Date(),
          image_url: req.body.image_url,
          adminId: req.body.adminId
          
        },
        where:{
          id : foundNews.id
        }
      });
      res.status(200).json(updatedNews);
  
     },
     getsingleNews:async (req:Request,res: Response)=>
      {
    req.newsId=+req.params.id;

const foundNews= await prisma.news.findFirst({
where:{
  id:+req.newsId
}

      });

return res.status(200).json(foundNews)

      },
deleteNews:async (req:Request,res:Response)=>
{
  req.newsId=+req.params.id
const foundNews= await prisma.news.findFirst
({ 
where:{
  id:+req.newsId
}

});
if(!foundNews){
  return res.status(404).json({ error: 'News not found' });
 }
const deletedNews= await prisma.news.delete({
  where:{
    id:foundNews.id
  }
}

);

return res.status(200).json(deletedNews);
    },
  }
export default newsController;