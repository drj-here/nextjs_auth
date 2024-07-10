import { connect } from "../../../../dbConfig/db";
import User from '../../../../models/userModel'
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from '../../../../helpers/getDataFromToken'

connect()

export async function POST(request:NextRequest){
    const userId=await getDataFromToken(request)
    const user=await User.findById(userId).select("-password")
    
    return NextResponse.json({
        message:"user found",
        data:user 
    })
}