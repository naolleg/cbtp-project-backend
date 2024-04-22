
import { NextFunction, Request, Response } from "express";
import userSchema from "../user.schema";
import { prisma } from "../../../config/prisma.js";
import bcrypt from 'bcrypt'
import { POSITION } from "@prisma/client";


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
        return res.status(404).json({ error: 'user not found' });
    }
 
       req.body.password = bcrypt.hashSync(req.body.password, 10);
       //create the employee
       const  newUser=await prisma.user.create({
          data:{
            username : req.body.username,
             password: req.body.password,
             role:req.body.role,
             phonenumber:req.body.phonenumber,
             profiles:{
                create:{
                   firstname: req.body.firstname,
                   middlename: req.body.middlename,
                   lastname: req.body.lastname,
                   image_url: req.body.image_url,
                   gender:req.body.gender,
                   position:req.body.position
                }
             },
           
             },
       
       include:{
          profiles: true,
         
       }
    
    });
    res.status(201).json(newUser);
    },
    update: async (req:Request,res:Response,next:NextFunction)=>{
      req.userId = + req.params.id;
      userSchema.updateEmployee.parse(req.body);
      const user = await prisma.user.findFirst({where: {id: +req.userId}});
      if(!user){
         return res.status(404).json("user not found");
      }
      const updatedUser = await prisma.user.update({where: {id: +req.userId},data:{
         profiles:{
            update:{
               firstname: req.body.firstname,
               middlename: req.body.middlename,
               lastname: req.body.lastname,
               image_url: req.body.image_url,
               gender:req.body.gender,
               position:req.body.position
            }
         },
       
         },
   
   include:{
      profiles: true,
     
   }

});

     
      res.status(200).json(updatedUser);
   },
   delete: async (req:Request,res:Response,next:NextFunction)=>{
      req.userId = + req.params.id;
      const user = await prisma.user.findFirst({where: {id: +req.userId}});
      if(!user){
         // return  res.status(404).json("user not found");
      }
      const deletedUser = await prisma.user.delete({where: {id: +req.userId}});
      res.status(200).json({
         message: "sucessfully deleted",
         sucess: true
      });
   },
   getAll: async (req:Request,res:Response,next:NextFunction)=>{
      const employee = await prisma.user.findMany({where: {
         NOT:{role: "MOTHER"}
      }});
      res.status(200).json(employee);
   },
   getSingle: async (req:Request,res:Response,next:NextFunction)=>{
      req.userId = + req.params.id;
      const user = await prisma.user.findFirst({where: {id: +req.userId}});
      if(!user){
         return  res.status(404).json("user not found");
      }
      res.status(200).json(user);

   },
 
}
export default employeeController