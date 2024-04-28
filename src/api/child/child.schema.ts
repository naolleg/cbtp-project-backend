import { GENDER } from "@prisma/client";
import { z } from "zod";

const childSchema ={
    //register child
    registerChild: z.object({
      date_of_birth: z.string(),
      blood_type: z.string(),
      firstname: z.string(),
      middlename: z.string(),
      lastname: z.string(),
      mother_id: z.number(),
   
      gender: z.string(),  
   }),
   updateChild: z.object({
    
         date_of_birth: z.string(),
         blood_type: z.string(),
         firstname: z.string(),
         middlename: z.string(),
         lastname: z.string(),
         mother_id: z.string(),
      
         gender: z.string()   
   }),

}

export default childSchema;