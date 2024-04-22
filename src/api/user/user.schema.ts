import { z } from "zod";
const userSchema ={
login: z.object({
    email:z.string().email(),
    password:z.string()
    
}),
        registerEmployee: z.object({
        healthStationId: z.number(),
        email: z.string().email(),
        phone: z.string().max(14),
        password: z.string().min(8).max(20),
       //profile
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        sex: z.enum(['MALE', 'FEMALE']),
        imageUrl: z.string(),
        //manager, reception and hp related
        title: z.string(),
        position: z.string()
        
 }),
}
export default userSchema;