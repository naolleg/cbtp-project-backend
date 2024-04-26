import { GENDER } from "@prisma/client";
import { z } from "zod";

const childSchema ={
    //register child
    registerChild: z.object({
      date_of_birth: z.date(),
      blood_type: z.string(),
      firstname: z.string(),
      middlename: z.string(),
      lastname: z.string(),
      mother_id: z.string(),
   
      gender: z.string(),  
   }),
   updateChild: z.object({
      healthStationId: z.number(),
      motherId: z.number(),
     //profile
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      sex: z.enum(['MALE', 'FEMALE']),
      //manager, reception and hp related
      birthdate: z.string(),
      bloodType: z.string(),      
   }),

}

export default childSchema;