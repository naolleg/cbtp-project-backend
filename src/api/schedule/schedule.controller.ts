import cron, { schedule } from 'node-cron';
import {sendSmd} from '../../../util/m'
import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { date } from 'zod';

const scheduleController={
 nextschedule:async(req:Request,res:Response)=>{
 
let dataUrl = null;

  const nextschedule=await prisma.schedule.create({
   data:{
    
    child_id: +req.body!.child_id,
    next_schedule:new Date(),
    description:req.body.description,
    createdAt:new Date()

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

const message = `YOUR NEXT SCHEDULE IS ${nextschedule.next_schedule.toString} PLEASE SET REMINDER TO NOT MISS IT`;
const re = await sendSmd(phone,message);
console.log(re);
 
return res.status(201).json({
  success: true,
  message: "registered successfully",
   
});
 
}
}

export default scheduleController