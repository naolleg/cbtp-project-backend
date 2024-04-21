import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UnprocessableEntity, ErrorCode } from "your-error-package"; // Replace with the appropriate error package
import vaccineSchema from "./vaccine.schema.js";

const prisma = new PrismaClient();

const vaccineController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      vaccineSchema.register.parse(req.body);
      // Check if the vaccine already exists
      const vaccine = await prisma.vaccine.findFirst({
        where: {
          OR: [
            { v_name: req.body.v_name },
           
          ]
        }
      });

      if (vaccine) {
        return res.status(401).json({
          message: "vaccine already exists"
        });
      }
      req.body.registeredBy = req.admin?.id;
      const newVaccine = await prisma.vaccine.create({ data: req.body });
      res.status(200).json(newVaccine);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vaccines = await prisma.vaccine.findMany();
      res.status(200).json(vaccines);
    } catch (error) {
      next(error);
    }
  }
};

export default vaccineController;
