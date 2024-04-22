
import { NextFunction, Request, Response } from "express";
// import motherSchema from "./mother.schema.js";
import { prisma } from "../../../config/prisma.js";
import userSchema from "../user.schema";


import bcrypt from 'bcrypt'


const motherController ={
   register: async (req:Request,res:Response,next:NextFunction): Promise<void> =>{
      userSchema.registerMother.parse(req.body);
      //check if the employye exist before
      const isMotherExist = await prisma.user.findFirst({where:{
         OR:[
            {username: req.body.username},
         ]
      }});
      if(isMotherExist){
          res.status(404).json({ error: 'user exists' });
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      //create the employee
      const newMother=await prisma.user.create({
         data:{
            username : req.body.username,
            password: req.body.password,
            role: "MOTHER",
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
            mothers:{
               create:{
                  date_of_birth: req.body.date_of_birth,
                
               }
            }
      },
      include:{
         profiles: true,
         mothers:true
      }
   
   });
   res.status(201).json(newMother);
   },
   update: async (req:Request,res:Response,next:NextFunction)=>{
      req.mId=+req.params.id;
      userSchema.updateMother.parse(req.body);
      const isMother = await prisma.user.findFirst({
         where: {
            AND:[
               {id:+req.mId},{role: "MOTHER"}
            ]
         }
      });
      if(!isMother){
         return res.status(404).json({ error: 'user not found' });
      }
      //update the user info
      const updatedMother = await prisma.user.update({
         where: {
            id: +req.mId
         },
         data:{
            profiles:{
               update:{
                  firstName: req.body.firstName,
                  middleName: req.body.middleName,
                  lastName: req.body.lastName,
                  imageUrl: req.body.imageUrl,
                  sex:req.body.sex
               }
            },
            motherProfile:{
               update:{
                  birthdate: new Date(req.body.birthdate),
                  bloodType: req.body.bloodType,}}}
      })
      res.status(200).json(updatedMother);
   

   },
   delete: async (req:Request,res:Response,next:NextFunction)=>{
      req.mId=+req.params.id;
      userSchema.updateMother.parse(req.body);
      const isMother = await prisma.user.findFirst({
         where: {
            AND:[
               {id:+req.mId},{role: "MOTHER"}
            ]
         }
      });
      if(!isMother){
         return res.status(404).json({ error: 'user not found' });
      }
      //start deleting
      const isDeleted = await prisma.user.delete({where: {
         id: +req.mId
      }});
      res.status(200).json({
         message: "sucessfully deleted",
         sucess: true
      });

   },
   getAll: async (req:Request,res:Response,next:NextFunction)=>{
      const allMothers = await prisma.user.findMany({
         where: {role: "MOTHER"}
      });
      res.status(200).json(allMothers);
   },
   getSingle: async (req:Request,res:Response,next:NextFunction)=>{
      req.mId=+req.params.id;
      const isMother = await prisma.user.findFirst({
         where: {
            AND:[
               {id:+req.mId},{role: "MOTHER"}
            ]
         }
      });
      if(!isMother){
         return res.status(404).json({ error: 'user not found' });
      }
      res.status(200).json(isMother);
   },
  
}

export default motherController;