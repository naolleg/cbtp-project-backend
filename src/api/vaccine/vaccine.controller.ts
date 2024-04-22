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
  },
  updatevaccine: async (req:Request,res:Response,nex:NextFunction)=>{
      
    req.vaccineId=+req.params.id;
    vaccineSchema.updatevaccine.parse(req.body);
 
    const foundvaccine=await prisma.vaccine.findFirst({
      where:{
        id: +req.vaccineId
      }
    });
  
    if (!foundvaccine) {
      return res.status(404).json({ error: 'vaccine not found' });
    }

    // Update the news using req.body
    const  updatedvaccine = await prisma.vaccine.update({
      data:{
        v_name:req.body.v_name,
        description: req.body.description,
        ageRange: req.body.ageRange,
        adminId: req.body.adminId

    },
      where:{
        id : foundvaccine.id
      }
    });
    res.status(200).json(updatedvaccine);

   },
};

export default vaccineController;
