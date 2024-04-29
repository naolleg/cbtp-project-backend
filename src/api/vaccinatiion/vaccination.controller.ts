import {Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { create } from "axios";
import { sendSmd } from "../../../util/m.js";
import moment from "moment";
//import vaccinationSchema from "./vaccination.schema.js";



const vaccinationController = {
  vaccinate: async (req: Request, res: Response) => {
    // try {
   
      
  //  vaccinationSchema.vaccinate.parse(req.body);
                                 
      const nextApp=req.body.nextApp

      const newVaccination = await prisma.vaccination.create({
           data:{
             vaccine_id:req.body.vaccine_id,
             child_id: req.body.child_id,
             doctor_id:req.body.doctor_id,
             creationDate:new Date(),
             nextApp:new Date
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
              //     include:{
              //  profiles:{
              //   select:{
              //     firstname:true
              //   }
              //  }
              //     },
                  select:{
                    phonenumber:true,
                    username:true
                  }
                  
                }
              }
            }
          },
          })
          const childname=ischild?.firstname
             const  phone=Number(ischild?.mother?.user.phonenumber)
       console.log("fdvdfv");
       const name=ischild?.mother?.user.username
       const nextAppWords = moment(nextApp).format('MMMM Do YYYY, h:mm:ss a'); 
        const message = `hey ${name} come next on ${nextAppWords} for your child ${childname} next apointment`;
        const re = await sendSmd(phone,message);
        console.log(re);
         
        
         
    
     return res.status(200).json({ success: true,
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
