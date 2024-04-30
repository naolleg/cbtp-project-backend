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
      where: {
        id: +req.body.child_id,
      },
    });
    if (!childExist) {
      return res
        .status(404)
        .json({ success: false, message: "child not found" });
    }
    const vaccineExist = await prisma.vaccine.findFirst({
      where: {
        id: +req.body.vaccine_id,
      },
    });
    if (!vaccineExist) {
      return res
        .status(404)
        .json({ success: false, message: "vaccine not found" });
    }
    const doctorExist = await prisma.user.findFirst({
      where: {
        id: +req.body.doctor_id,
        profiles: {
          some: {
            position: "DOCTOR",
          },
        },
      },

      include: {
        profiles: true,
        employee:true,
      },
    });
    console.log({
      child_id: +req.body.child_id,
      doctor_id: +req.body.doctor_id,
      creationDate: new Date(),
      nextApp: new Date(nextApp),
      vaccine_id: +req.body.vaccine_id,
    },)
    console.log(doctorExist);
    if (!doctorExist) {
      return res
        .status(404)
        .json({ success: false, message: "doctor not found" });
    }
    const newVaccination = await prisma.vaccination.create({
      data: {

        child_id: +req.body.child_id,
        doctor_id: 1,
        nextApp: new Date(nextApp),
        vaccine_id: +req.body.vaccine_id,
      },
    });
    console.log(newVaccination)

    return res.status(200).json({
      success: true,
      message: "child vaccinated sucessfully",
      newVaccination,
    });
  },

  getAllvaccination: async (req: Request, res: Response) => {
    try {
      const vaccination = await prisma.vaccination.findMany();
      res.status(200).json({
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

    return res.status(200).json({
      success: true,
      message: "vaccine found successfully",
      foundvaccination,
    });
  },
  updatevaccinate: async (req: Request, res: Response) => {
    const nextApp = req.body.nextApp;
    const childExist = await prisma.child.findFirst({
      where: {
        id: +req.body.child_id,
      },
    });
    if (!childExist) {
      return res
        .status(404)
        .json({ success: false, message: "child not found" });
    }
    const vaccineExist = await prisma.vaccine.findFirst({
      where: {
        id: +req.body.vaccine_id,
      },
    });
    if (!vaccineExist) {
      return res
        .status(404)
        .json({ success: false, message: "vaccine not found" });
    }
    const doctorExist = await prisma.user.findFirst({
      where: {
        id: +req.body.doctor_id,
        profiles: {
          some: {
            position: "DOCTOR",
          },
        },
      },
      include: {
        profiles: true,
      },
    });
    if (!doctorExist) {
      return res
        .status(404)
        .json({ success: false, message: "doctor not found" });
    }
 
    const isVaccinationExist = await prisma.vaccination.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!isVaccinationExist) {
      return res.status(404).json({
        message: "vaccination not found",
        success: false,
      });
    }
    const newVaccination = await prisma.vaccination.update({
      where:{
        id:+req.params.id
      },
      data: {
        child_id: +req.body.child_id,
        doctor_id: +req.body.doctor_id,
        creationDate: new Date(),
        nextApp: new Date(nextApp),
        vaccine_id: +req.body.vaccine_id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "child vaccinated sucessfully",
      newVaccination,
    });
  },
};

export default vaccinationController;
