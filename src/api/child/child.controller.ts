import { Request, Response } from "express";
import childSchema from "./child.schema";
import { prisma } from "../../config/prisma.js";


const childController ={
   register: async (req:Request,res:Response)=>{
    childSchema.registerChild.parse(req.body);
    //check if mother exist 
    const isMotherExist = await prisma.mother.findFirst({
      where: {id: req.body.motherId}
    });
    if(!isMotherExist){
      return res.status(404).json({ error: 'mother not found' });
    }
    // start rgistering
    const newchild = await prisma.child.create({
      data:{
        
         date_of_birth: new Date(req.body.birthdate),
         blood_type: req.body.blood_type,
         firstname: req.body.firstname,
         middlename: req.body.middlename,
         lastname: req.body.lastname,
         mother_id: req.body.mother_id,
         created_time: new Date(),
         gender:req.body.gender
      }
    });
    res.status(200).json(newchild);
   },
   update: async (req:Request,res:Response)=>{
      req.childId = +req.params.id;
      childSchema.updateChild.parse(req.body);
      const isChildExist = await prisma.child.findFirst({where: {id: +req.childId}});
      if(!isChildExist){
       
        return res.status(404).json({ error: 'child not found' });
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
      res.status(200).json(updatedChild);
   },
   delete: async (req:Request,res:Response)=>{
      req.childId = +req.params.id;
      const isChildExist = await prisma.child.findFirst({where: {id: +req.childId}});
      if(!isChildExist){
        return  res.status(404).json({ error: 'child not found' });
      }
      const deletedChild = await prisma.child.delete({where:{id: +req.childId}});
      res.status(200).json({
         message: "sucessfully deleted",
         sucess: true
      });
   },
   getAll: async (req:Request,res:Response)=>{
      const isChildExist = await prisma.child.findMany();
      res.status(200).json(isChildExist);
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
         return  res.status(404).json({ error: 'mother not found' });
      }
      const isChildExist = await prisma.child.findMany({
         where: {
            id:req.mId
         }
      });
      res.status(200).json(isChildExist);
   },
   getSingle: async (req:Request,res:Response)=>{
      req.childId = +req.params.id;
      const isChildExist = await prisma.child.findFirst({where: {id: +req.childId}});
      if(!isChildExist){
        return   res.status(404).json({ error: 'child not found' });
      }
      res.status(200).json(isChildExist);
   },
  
}

export default childController;