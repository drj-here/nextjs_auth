import { connect } from "../../../../dbConfig/db";
import User from '../../../../models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email, password}= reqBody;

        const user=await User.findOne({email})
        
        if(!user) return NextResponse.json({error:"This account doesn't exist."},{status:400})
        
        const validPassword=await bcrypt.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error:"Incorrect password"},{status:400})
        }
        
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        
        const response=NextResponse.json({
            message:"logged in successfully",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}
