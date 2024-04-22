import { NextFunction, Request, Response } from "express";

export const errorMiddleware: any = (err:any, req:Request, res:Response, nex:NextFunction) => {
      console.log("--------------_+_+-------------------------");
     
   return res.status(err.statusCode).json({
         message: err.message,
         errorCode: err.errorCode,
         errors: err.error      
   });
};
    