import { decrypt, deleteSession } from "@/libs/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const cookie=request.cookies.get('session')
        if(!cookie){
            return NextResponse.json({success:false,message:'Unauthorized'},{status:401})
        }
        const session=await decrypt(cookie.value)
        if(!session){
            return NextResponse.json({success:false,message:'Unauthorized'},{status:401})
        }
        await deleteSession()
        return NextResponse.json({success:true,message:'Logged out successfully'},{status:200})
    } catch (error) {
        console.error('Error logging out:', error)
        return NextResponse.json({success:false,message:'Internal Server Error'},{status:500})
    }
}