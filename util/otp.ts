export const generateOTP = (): string=> {
    const digits = '0123456789';
    let otp = '';
 
    for (let i = 0; i < 6; i++) {
       const randomIndex = Math.floor(Math.random() * digits.length);
       otp += digits[randomIndex];
    }
 
    return otp;
 }
 


 export function generatePassword() {
   const length = 8;
   const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
   let password = "";
   
   for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * charset.length);
     password += charset.charAt(randomIndex);
   }
   
   return password;
 }
 
 // Usage
 const password = generatePassword();
 console.log(password);