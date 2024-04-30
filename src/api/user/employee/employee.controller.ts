import { Request, Response } from "express";
import userSchema from "../user.schema";
import { prisma } from "../../../config/prisma.js";
import bcrypt from "bcrypt";
import { POSITION } from "@prisma/client";
import { BASE_URL } from "../../../config/secrete";

const employeeController = {
  register: async (req: Request, res: Response) => {
    let dataUrl = null;
    userSchema.registerEmployee.parse(req.body);
    console.log(req.files)
    // Check if content or attachments are provided
    if (!req.files.attachments || req.files.attachments.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Content or attachments are required",
      });
    }
    // Prepare attachments
    const messageFiles = req.files?.attachments?.map((attachment: any) => ({
      url: attachment.filename,
    }));
    
    const url = `${BASE_URL}images/${messageFiles[0].url}`;
    dataUrl = url;
    userSchema.registerEmployee.parse(req.body);
    //check if the employye exist before
    const isEmployeeExist = await prisma.user.findFirst({
      where: {
        OR: [{ username: req.body.email }],
      },
    });
    if (isEmployeeExist) {
      return res.status(404).json({ success: false,message: "user  is allready registered" });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    //create the employee
    
    const newUser = await prisma.user.create({
      data: {
        username: req.body.email,
        password: req.body.password,
        role: "REGISTRER",
        phonenumber: req.body.phonenumber,
        profiles: {
          create: {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            image_url: url,
            gender: req.body.gender,
            position: "DOCTOR",
          },

        },
        employee: {
          create: {
            email: req.body.email,
          },
        },
      },

      include: {
        profiles: true,
      },
    });
  return  res.status(201).json({
      success: true,
      message: "registered successfully",
      newUser
    });
  },
  update: async (req: Request, res: Response) => {
    req.userId = +req.params.id;
    userSchema.updateEmployee.parse(req.body);
    const user = await prisma.user.findFirst({ where: { id: +req.userId } });
    if (!user) {
      return res.status(404).json({success: false,message: "user not found"});
    }
    const updatedUser = await prisma.profile.update({
      where: { user_id: +req.userId! },
      data: {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        image_url: req.body.image_url,
        gender: req.body.gender,
        position: req.body.position,
      },
    });

  return  res.status(200).json({
      success: true,
      message: "updated successfully",updatedUser});
  },
  delete: async (req: Request, res: Response) => {
    req.userId = +req.params.id;
    const user = await prisma.user.findFirst({ where: { id: +req.userId } });
    if (!user) {
      //

      return res.status(404).json({success: false,message: "user not found"});
    }
    const deletedUser = await prisma.user.delete({
      where: { id: +req.userId },
    });
   return res.status(200).json({
      message: "sucessfully deleted",
      sucess: true,
    });
  },
  getAll: async (req: Request, res: Response) => {
    const employee = await prisma.user.findMany({

      where: {
        NOT: { role:"ADMIN" },
      },
      
      include: {
        profiles: true,
      },
    });
   return res.status(200).json({
      success: true,
      message: "found successfully",employee});
  },
  getSingle: async (req: Request, res: Response) => {
    req.userId = +req.params.id;
    const user = await prisma.user.findFirst({ where: { id: +req.userId } });
    if (!user) {
      return res.status(404).json({success: false,message: "user not found"});
    }
   return res.status(200).json({
      success: true,
      message: "found successfully",user});
  },
};
export default employeeController;
