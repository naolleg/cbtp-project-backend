import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import vaccineSchema from "./vaccine.schema.js";



const vaccineController = {
  register: async (req: Request, res: Response) => {
    // try {
   
      
      vaccineSchema.register.parse(req.body);
      // Check if the vaccine already exists
      // const vaccine = await prisma.vaccine.findFirst({
      //   where: {
      //     OR: [
      //       { v_name: req.body.v_name },
           
      //     ]
      //   }
      // });

      // if (vaccine) {
      //   return res.status(401).json({
      //     message: "vaccine already exists"
      //   });
      // }

      const newVaccine = await prisma.vaccine.create({
         data:{
             v_name:req.body.v_name,
             description: req.body.description,
             ageRange: req.body.ageRange,
             adminId: req.body.adminId

         }
    });
      res.status(200).json(newVaccine);
    // } catch (error) {
    // throw error }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vaccines = await prisma.vaccine.findMany();
      res.status(200).json(vaccines);
    } catch (error) {
      next(error);
    }
  }
};

export default vaccineController;
