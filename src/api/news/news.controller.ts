import { Request, Response } from "express";
import newsSchema from "./news.schema.js";
import { prisma } from "../../config/prisma.js";
import { log } from "console";
import { BASE_URL } from "../../config/secrete.js";
import { number } from "zod";

const newsController = {
  //create news
  createnew: async (req: Request, res: Response) => {
    let dataUrl = null;
    const attachments = req.files?.attachments;
    console.log("/////////////////////////////////////")
  console.log(attachments);
    // Check if content or attachments are provided
    if (!attachments || attachments.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Content or attachments are required",
      });
    }
  
    // Prepare attachments
    const messageFiles = attachments.map((attachment: any) => ({
      url: attachment.filename,
    }));
  console.log(messageFiles)
    const url = `${BASE_URL}images/${messageFiles[0].url}`;
    dataUrl = url;
    console.log(url);
    console.log(req.body);
    const adminid  =parseInt(req.body.adminid)
    try {
      const theNewNews = await prisma.news.create({
        data: {
          
         title: req.body.title,
         description: req.body.description,
         publication_date: new Date(),
         image_url: url,
         adminId: adminid,
        // description: req.body.description,
        // publication_date: new Date(),
        // image_url: url,
        // adminId: parseInt(req.body.adminId),
        },
      });
      console.log("''''''''''''''''''''''''''")
  console.log(theNewNews)
      return res.status(200).json({
        message: "News created successfully",
        success: true,
        data: theNewNews,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to create news",
        success: false,
        error: error.message,
      });
    }
  },

  //get public news
  getNews: async (req: Request, res: Response) => {
    const news = await prisma.news.findMany({
      orderBy: {
        publication_date: "desc",
      },
      include: {
        admin: {
          include: {},
        },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "registered successfully", news });
  },
  //update news
  updateNews: async (req: Request, res: Response) => {
    req.newsId = +req.params.id;
    newsSchema.updateNews.parse(req.body);

    const foundNews = await prisma.news.findFirst({
      where: {
        id: +req.newsId,
      },
    });

    if (!foundNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // Update the news using req.body
    const updatedNews = await prisma.news.update({
      data: {
        title: req.body.title,
        description: req.body.description,
        publication_date: new Date(),
        image_url: req.body.image_url,
        adminId: req.body.adminId,
      },
      where: {
        id: foundNews.id,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "updated successfully", updatedNews });
  },
  getsingleNews: async (req: Request, res: Response) => {
    req.newsId = +req.params.id;

    const foundNews = await prisma.news.findFirst({
      where: {
        id: +req.newsId,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "found successfully", foundNews });
  },
  deleteNews: async (req: Request, res: Response) => {
    req.newsId = +req.params.id;
    const foundNews = await prisma.news.findFirst({
      where: {
        id: +req.newsId,
      },
    });
    if (!foundNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }
    const deletedNews = await prisma.news.delete({
      where: {
        id: foundNews.id,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "deleted successfully", deletedNews });
  },
};
export default newsController;
