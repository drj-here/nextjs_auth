import { connect } from "../../../../dbConfig/db";
import { NextRequest,NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {
        const response=NextResponse.json({
            message:"Logged out successfully",
            success:true 
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0),
            path:'/'
        })

        return response;
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}