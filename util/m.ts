
import axios from "axios";




export const sendSmd =async (to: string,message:string)=>{
    const token = process.env.TOKEN;
    const formData ={
        to: to,
        message: message
    }
  
    console.log(formData);
    
    try {
        const response = await axios.post(`${process.env.PHONE}`, formData, {
          headers: {
            'Authorization': `${token}`
          }
        });
       console.log(response.data);
    
        if (response.status === 200) {
          return {
            success: true,
            message: 'SMS sent successfully',
          };
        } else {
            return {
                success: false,
                message: 'SMS not sent',
              };
         
        }
      } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message:  error,
          };
      }
    
}