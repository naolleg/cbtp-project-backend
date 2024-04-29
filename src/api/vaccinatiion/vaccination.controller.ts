import { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { create } from "axios";
import { sendSmd } from "../../../util/m.js";
import moment from "moment";
//import vaccinationSchema from "./vaccination.schema.js";

const vaccinationController = {
  vaccinate: async (req: Request, res: Response) => {
    const nextApp = req.body.nextApp;
    const childExist = await prisma.child.findFirst({
      where:{
        id: +req.body.child_id,
      }
    });
    if(!childExist){
      return res.status(404).json({ success: false, message: "child not found" });
    }
    const vaccineExist = await prisma.vaccine.findFirst({
      where:{
        id: +req.body.vaccine_id,
      }
    });
    if(!vaccineExist){
      return res.status(404).json({ success: false, message: "vaccine not found" });
    }
    const doctorExist = await prisma.user.findFirst({
      where:{
        id: +req.body.doctor_id,
        profiles:{
          some:{
            position: "DOCTOR",
          }
        }
      },
      include:{
        profiles:true
      }
    });
    if(!doctorExist){
      return res.status(404).json({ success: false, message: "doctor not found" });
    }
    const newVaccination = await prisma.vaccination.create({
      data: {
        child_id: +req.body.child_id,
        doctor_id: +req.body.doctor_id,
        creationDate: new Date(),
        nextApp: new Date(nextApp),
        vaccine_id: +req.body.vaccine_id
      }
    });
    console.log(req.body);
    console.log(newVaccination);
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiiii");
     return res
      .status(200)
      .json({ success: true, message: "child vaccinated sucessfully", newVaccination });
    // const newVaccination = await prisma.vaccination.create({
    //   data: {
    //     vaccine_id: req.body.vaccine_id,
    //     child_id: req.body.child_id,
    //     doctor_id: req.body.doctor_id,
    //     creationDate: new Date(),
    //     nextApp: new Date(nextApp),
        
    //   },
    // });
    // const ischild = await prisma.child.findFirst({
    //   where: {
    //     id: req.body.child_id,
    //   },

    //   include: {
    //     mother: {
    //       include: {
    //         user: {
    //           select: {
    //             phonenumber: true,
    //             username: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    // const childname = ischild?.firstname;
    // const phone = ischild?.mother?.user.phonenumber!;
    // //  console.log("fdvdfv");
    // const name = ischild?.mother?.user.username;
    // const nextAppWords = moment(nextApp).format("MMMM Do YYYY, h:mm:ss a");
    // const message = `hey ${name} come next on ${nextAppWords} for your child ${childname} next apointment`;
    // const re = await sendSmd(phone, message);
    // console.log(re);

   
    
  },

  getAllvaccination: async (req: Request, res: Response) => {
    try {
      const vaccination = await prisma.vaccination.findMany();
      res
        .status(200)
        .json({
          success: true,
          message: "vaccinations found succesfully",
          vaccination,
        });
    } catch (error) {
      throw error;
    }
  },

  getsinglevaccination: async (req: Request, res: Response) => {
    req.vaccineId = +req.params.id;

    const foundvaccination = await prisma.vaccination.findFirst({
      where: {
        id: +req.vaccinationId,
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "vaccine found successfully",
        foundvaccination,
      });
  },
};

export default vaccinationController;
