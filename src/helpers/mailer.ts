import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import User from '../models/userModel'

export const sendEmail=async({email, emailType, userId}:any)=>{
    try {
        const hashedToken= await bcrypt.hash(userId.toString(),10)
        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(
                userId,{
                    $set: {verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+360000}}
            )
        }
        else if(emailType==='RESET'){
            await User.findByIdAndUpdate(
                userId,{
                    $set:{forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+360000}}
            )
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user:process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });

        const mailOptions={
            from:'drj09003@gmail.com',
            to:email,
            subject:emailType==='VERIFY'?'verify your email':'reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VERIFY'?"verify your email":"reset your password"} 
             or copy paste the link in the browser.
             <br>
             ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse= await transporter.sendMail(mailOptions) 
        return mailResponse;
    } catch (error:any) {
        console.log(error)
        throw new Error(error.message)
    }
}