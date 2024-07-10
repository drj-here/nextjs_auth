import { connect } from "../../../../dbConfig/db";
import User from '../../../../models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendEmail } from "../../../../helpers/mailer";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username, email, password}= reqBody;

        const user=await User.findOne({email})
        console.log("Entered here");
        if(user) return NextResponse.json({error:"Username and email already exists. Try with different email and username"},{status:400})
        
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser=await newUser.save()
        console.log(savedUser)

        // verification email
        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})
        
        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            savedUser
        })
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}
