import { z } from "zod";
const userSchema ={
login: z.object({
    username:z.string(),
    password:z.string()
    
}),
        registerEmployee: z.object({
        phonenumber: z.string().max(14),
        password: z.string().min(8).max(20),
       //profile
        firstname: z.string(),
        middlename: z.string(),
        lastname: z.string(),
        gender: z.enum(['MALE', 'FEMALE']),
        image_url: z.string(),
        //manager, reception and hp related
        position: z.string(),
        email:z.string()
        
 }),
 updateEmployee : z.object({
    phonenumber: z.string().max(14),
    password: z.string().min(8).max(20),
   //profile
    firstname: z.string(),
    middlename: z.string(),
    lastname: z.string(),
    gender: z.enum(['MALE', 'FEMALE']),
    image_url: z.string(),
    //manager, reception and hp related
    position: z.string(),
    email:z.string()
        
}),
registerMother: z.object({

    phonenumber: z.string().max(14),
    // password: z.string().min(8).max(20),
   
    firstname: z.string(),
    middlename: z.string(),
    lastname: z.string(),
     gender: z.enum(['MALE', 'FEMALE']),
    image_url: z.string(),
    //mother related
    date_of_birth : z.string(),

  
 }),
 updateMother:z.object({

    phonenumber: z.string().max(14),
    password: z.string().min(8).max(20),
   
    firstname: z.string(),
    middlename: z.string(),
    lastname: z.string(),
     gender: z.enum(['MALE', 'FEMALE']),
    image_url: z.string(),
    //mother related
    date_of_birth : z.string(),
}),
}
export default userSchema;