import { z } from "zod";
const userSchema ={
login: z.object({
    email:z.string().email(),
    password:z.string()
    
 }),
}
export default userSchema;