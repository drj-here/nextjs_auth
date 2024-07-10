import { connect } from "../dbConfig/db"
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect();

export function getDataFromToken(request:NextRequest){
     try {
        const token=request.cookies.get("token")?.value || "";
        const decodedToken:any=jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken.id 
     } catch (error:any) {
        throw new Error(error.message)
     }
}