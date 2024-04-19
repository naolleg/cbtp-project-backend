
import { NextFunction, Request, Response } from "express";
import motherSchema from "./mother.schema.js";
import { prisma } from "../../../config/prisma.js";


import bcrypt from 'bcrypt'

const motherController ={
    register: async (req:Request,res:Response,next:NextFunction) =>{
        motherSchema.registerMother.parse(req.body);
        //check if the employye exist before
        const isMotherExist = await prisma.user.findFirst({where:{
           OR:[
              {username: req.body.email},
              {phonenumber: req.body.phone}
           ]
        }});
        
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        //create the employee
        const newMother=await prisma.mother.create({
           data:{
              username:req.body.username,
              password: req.body.password,
              phonenumber: req.body.phone,
              role: "MOTHER",
              date_of_birth:req.body.date_of_birth,
             address:req.body.address,

              
              },
            })}}
        
export default motherController;