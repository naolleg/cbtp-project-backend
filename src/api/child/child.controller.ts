import { Request, Response } from "express";
import childSchema from "./child.schema";
import { prisma } from "../../config/prisma.js";



const childController ={
   register: async (req:Request,res:Response)=>{
    childSchema.registerChild.parse(req.body);
    //check if mother exist 
    console.log(req.body);
    const isMotherExist = await prisma.user.findFirst({
      where: {
         AND:[
            {id: +req.body.mother_id},
            {role:"MOTHER"}
         ]
      },
      include: {
         mothers: true
      }
    });
  
    if(!isMotherExist || !isMotherExist!.mothers[0].id){
      return res.status(404).json({ message: 'mother not found',
         success: false
       });
    }

    // start rgistering
    const newchild = await prisma.child.create({
      data:
      { 
         date_of_birth: new Date(req.body.date_of_birth),
         blood_type: req.body.blood_type,
         firstname: req.body.firstname,
         middlename: req.body.middlename,
         lastname: req.body.lastname,
         mother_id: +isMotherExist!.mothers[0].id,
         gender:req.body.gender
      }
    });
   //  console.log(isMotherExist);
   //  console.log(isMotherExist!.mothers[0].id)
   //  console.log(newchild);
   return res.status(200).json({
      data: newchild,
      message: "child created successfully",
      success: true

    });
   },
   update: async (req:Request,res:Response)=>{
      req.childId = +req.params.id;
      childSchema.updateChild.parse(req.body);
      const isChildExist = await prisma.child.findFirst({where: {id: +req.childId}});
      if(!isChildExist){
       
        return res.status(404).json({
         success: false,
         message:  'child not found' });
      }
      const updatedChild = await prisma.child.update({
         where: {
            id: +req.childId
         },
         data: {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            date_of_birth: new Date(req.body.birthdate),
            blood_type: req.body.bloodType
         }
      });
      res.status(200).json({
         success: true,
         message:updatedChild});
   },
   delete: async (req:Request,res:Response)=>{
      req.childId = +req.params.id;
      const isChildExist = await prisma.child.findFirst({where: {id: +req.childId}});
      if(!isChildExist){
        return  res.status(404).json({
         success: false,
         message:  'child not found' });
      }
      const deletedChild = await prisma.child.delete({where:{id: +req.childId}});
      res.status(200).json({
         message: "sucessfully deleted",
         sucess: true
      });
   },
   getAll: async (req:Request,res:Response)=>{
      const isChildExist = await prisma.child.findMany();
      res.status(200).json({
         success: true,
         message: "found successfully",isChildExist});
   },
   getAllByMother: async (req:Request,res:Response)=>{
      req.mId=+req.params.id;
      //check if mother exist
      const isMotherExist = await prisma.mother.findFirst({
         where: {
            id: +req.mId
         }
      });
      if(!isMotherExist){
         return  res.status(404).json({
            success: false,
            message:  'mother not found' });
      }
      const isChildExist = await prisma.child.findMany({
         where: {
            id:req.mId
         }
      });
      res.status(200).json({
         success: true,
         message: "found successfully",isChildExist});
   },
   getSingle: async (req:Request,res:Response)=>{
      req.childId = +req.params.id;
      const isChildExist = await prisma.child.findFirst({where: {id: +req.childId}});
      if(!isChildExist){
        return   res.status(404).json({
         success: false,
         message:'child not found' });
      }
      res.status(200).json({
         success: true,
         message: "found successfully",isChildExist});
   },
  
}

export default childController;