import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import userSchema from "./user.schema.js";
import bcrypt from "bcrypt";
import { SECRET } from "../../config/secrete";

const usersController = {
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      userSchema.login.parse(req.body);
      console.log(req.body);
      const user = await prisma.user.findFirst({
        where: { username: req.body.username },
      });
         console.log(user);
         
      if (!user) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      const userProfile = await prisma.profile.findFirst({
        where: { user_id: user.id },
      });

      // Create token
      const payload = {
        id: user.id,
        role: user.role,
        firstName: userProfile?.firstname,
      };
      const token = jwt.sign(payload, SECRET!);

      return res.status(200).json({
        token,
        message: "Login successfully",
      });
    } catch (error) {
      throw (error);
    }
  },
  myInfo: async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findFirst({
      where: { id:req.userId },
      include: {
        _count: true,
        profiles: true,
        mothers:{
        include:{
           child:true,
          
        }
        },
        employee: true,
      },
    });
    res.status(200).json(user);
  },
};

export default usersController;