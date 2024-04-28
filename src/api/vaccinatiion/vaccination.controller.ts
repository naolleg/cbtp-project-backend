import {Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { create } from "axios";
import { sendSmd } from "../../../util/m.js";
import { number } from "zod";
//import vaccinationSchema from "./vaccination.schema.js";



const vaccinationController = {
  vaccinate: async (req: Request, res: Response) => {
    // try {
   
      
    //  vaccinationSchema.register.parse(req.body);
                                 
      

      const newVaccination = await prisma.vaccination.create({
           data:{
             vaccine_id:req.body.vaccine_id,
             child_id: +req.body!.child_id,
             doctor_id:req.body.doctor_id,
             round:req.body.round,
            }

          });
          const ischild = await prisma.child.findFirst({
            where: {
              id: req.body.child_id
            },
           include:{
            mother:{
              include:{
                user:{
                  select:{
                    phonenumber:true
                  }
                }
              }
            }
           }})
             const  phone=Number(ischild?.mother?.user.phonenumber)
       
        const message = ``;
        const re = await sendSmd(phone,message);
        console.log(re);
         
        
         
    
      res.status(200).json({ success: true,
        message: "vaccine registered",newVaccination});
    // } catch (error) {
    // throw error }
  },

  getAllvaccination: async (req: Request, res: Response) => {
    try {
      const vaccination = await prisma.vaccination.findMany();
      res.status(200).json({ success: true,
        message: "vaccinations found succesfully",vaccination});
    } catch (error) {
      throw(error);
    }
  },
 

   getsinglevaccination: async (req:Request,res:Response)=>{
    req.vaccineId=+req.params.id;

    const foundvaccination= await prisma.vaccination.findFirst({
    where:{
      id:+req.vaccinationId
    }
    
          });
    
    return res.status(200).json({ success: true,
      message: "vaccine found successfully",foundvaccination})
   },
   

};

export default vaccinationController;
