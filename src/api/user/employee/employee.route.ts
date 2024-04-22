import { NextFunction, Request, Response } from "express";
import userSchema from "../user.schema";
import { prisma } from "../../../config/prisma.js";
import bcrypt from 'bcrypt'


const employeeController ={
    register: async (req:Request,res:Response,next:NextFunction)=>{
       userSchema.registerEmployee.parse(req.body);
       //check if the employye exist before
       const isEmployeeExist = await prisma.user.findFirst({where:{
          OR:[
             {username: req.body.username},
            
          ]
       }});
       if(isEmployeeExist){
        return res.status(404).json({ error: 'News not found' });
    }
 
       req.body.password = bcrypt.hashSync(req.body.password, 10);
       //create the employee
       const  newUser=await prisma.user.create({
          data:{
            username : req.body.username,
             password: req.body.password,
             : req.body.phone,
             role: req.body.role,
             healthStationId: req.body.healthStationId,
             profile:{
                create:{
                   firstName: req.body.firstName,
                   middleName: req.body.middleName,
                   lastName: req.body.lastName,
                   imageUrl: req.body.imageUrl,
                   sex:req.body.sex
                }
             },
             proProfile:{
                create:{
                   healthStationId:req.body.healthStationId,
                   position: req.body.position,
                   title: req.body.title
                }
             }
       },
       include:{
          profile: true,
          proProfile: true
       }
    
    });
    res.status(201).json(newUser);
    },
}