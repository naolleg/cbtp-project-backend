
import { NextFunction, Request, Response } from "express";
import motherSchema from "./mother.schema.js";
import { prisma } from "../../../config/prisma.js";


import bcrypt from 'bcrypt'

const motherController ={
    register: async (req:Request,res:Response,next:NextFunction): Promise<void> =>{
        motherSchema.registerMother.parse(req.body);
        //check if the employye exist before
        const isMotherExist = await prisma.user.findFirst({where:{
           OR:[
              {email: req.body.email},
              {phone: req.body.phone}
           ]
        }});
        if(isMotherExist){
           return next(new UnprocessableEntity('Email or Phone has been registered before',403,ErrorCode.USER_ALREADY_EXIST,null));
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        //create the employee
        const newMother=await prisma.mother.create({
           data:{
              username:re
              password: req.body.password,
              phonenumber: req.body.phone,
              role: "MOTHER",
              date_of_birth:req.body.date_of_birth,
             address:req.body.address,

              
              },
              motherProfile:{
                 create:{
                    birthdate: new Date(req.body.birthdate),
                    bloodType: req.body.bloodType,
                    RH: req.body.RH,  
                 }
              }
        },
        include:{
           profile: true,
           motherProfile:true
        }
     
     });
     res.status(201).json(newMother);
     },
}
export default motherController;