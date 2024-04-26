
import {NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/secrete.js";
import { prisma } from "../config/prisma.js";
import { any } from "zod";
import {  Admins, Role, User } from "@prisma/client";

const adminAuth:any = async (req:Request,res:Response,next:NextFunction)=>{
   const token = req.headers.authorization;
   if(!token){
     return res.status(404).json({ error: 'token not found' });
   }
   try {
      const payload = await jwt.verify(token, SECRET!) as any;
      const admin =  await prisma.admins.findUnique({
         where:{
            id:(payload).id
         }
      })
      if(!admin){
         return res.status(404).json({ error: 'admin not found' });
      }
      req.admins =admin;
    next();
    
   } catch (error) {
      return   res.status(404).json({ error: 'invalid token' });
   }

}
const userAuth: any = async (req: Request, res: Response,next:NextFunction) => {
   // console.log(req.body);
   const token = req.headers.authorization;
   if (!token) {
    return res.status(404).json({ error: 'token not found' });
   }
   try {
      const payload = await jwt.verify(token, SECRET!) as any;
      const user = await prisma.user.findFirst({
         where: {
            id: payload.id
         }
      });
      if (!user) {
        return res.status(404).json({ error: 'user not found' }); }
      req.user = user;
      // console.log(req.user);
   next();
   } catch (error) {
  throw error
   }
};



// const isSuperAdmin:any = async (req:Request,res:Response)=>{
//    const  admin : Admins |undefined = req.admin;
//    if(admin && admin.role !== AdminRole.SUPER){
      
//     return res.status(404).json({ error: 'token not found' });
//    }
// }

const isAdmin :any = async (req:Request,res:Response,next:NextFunction)=>{
   const  admin : Admins | undefined = req.admins;
   if(admin?.role !== Role.ADMIN){
     
    return res.status(404).json({ error: 'token not found' });
   }
  next();
}

const isHealthProfetional:any = async (req:Request,res:Response,next:NextFunction)=>{
   const  user : User | undefined= req.user;
   if(user && user.role !==  Role.DOCTOR){
   
    return res.status(404).json({ error: 'token not found' });
   }
   next();

}

// const isManager:any = async (req:Request,res:Response)=>{
//    const  user : User | undefined= req.user;
//    if(user && user.role !==  Role.MANAGER){
    
//     return res.status(404).json({ error: 'user not admin' });
//    }
// }
const isRegistrer:any = async (req:Request,res:Response,next:NextFunction)=>{
   const  user : User | undefined= req.user;
   if(user && user.role !==  Role.REGISTRER){
    
    return res.status(404).json({ error: 'user not registrer' });
   }
next();
}

const isMother:any = async (req:Request,res:Response,next:NextFunction)=>{
   const  user : User | undefined= req.user;
   if(user && user.role !==  Role.MOTHER){
   
    return res.status(404).json({ error: 'user not mother' });
   }
next();
}

const isEmployee:any = async (req:Request,res:Response,next:NextFunction)=>{
   const  user : User | undefined= req.user;
   if(user && user.role ===  Role.MOTHER){
      
    return res.status(404).json({ error: 'user not admin' });
   }
  next();
}

export {adminAuth,userAuth,isAdmin,isHealthProfetional,isRegistrer,isMother,isEmployee};