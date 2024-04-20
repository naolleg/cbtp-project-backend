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
      const vaccine = await prisma.vaccines.findFirst({
        where: {
          OR: [
            { name: req.body.name },
            { category: req.body.name }
          ]
        }
      });

      if (vaccine) {
        throw new UnprocessableEntity(
          "The vaccine is already registered",
          403,
          ErrorCode.VACCINE_ALREADY_EXIST,
          null
        );
      }

      req.body.registeredBy = req.admin?.id;
      const newVaccine = await prisma.vaccines.create({ data: req.body });
      res.status(200).json(newVaccine);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vaccines = await prisma.vaccines.findMany();
      res.status(200).json(vaccines);
    } catch (error) {
      next(error);
    }
  }
};

export default vaccineController;
