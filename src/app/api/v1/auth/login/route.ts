import RouteWrapper from "@/libs/RouteWrapper";
import { createSession } from "@/libs/session";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
const prisma = new PrismaClient()
export async function POST(request: NextRequest) {
    return RouteWrapper(async () => {
        await prisma.$connect();
        
        const requestBody = await request.json();
        const email = requestBody.email || null;
        const password = requestBody.password || null;
        if (!email || !password) {
            const missingFields = [];
            if (!email) missingFields.push('email');
            if (!password) missingFields.push('password');
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
                error: `Please provide the following required fields: ${missingFields.join(', ')}`,
                missingFields
            }, {
                status: 400
            });
        }
        if (!validator.isEmail(email)) {
            return NextResponse.json({
                success: false,
                message: "Invalid Email",
                error: `Please provide Valid Email`,
            }, {
                status: 400
            });
        }
        const userInfo = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!userInfo) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "User not found with this email"
            }, {
                status: 404
            })
        }
        const isPasswordValid = await compare(password, userInfo.password)
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "Password Is Not Valid"
            }, {
                status: 404
            })
        }
         await createSession(userInfo.id)
        // Return success response with user data
        return NextResponse.json({
            success: true,
            message: "Login successful! Welcome Back.",
            data: {
                user: userInfo,
            }
        }, {
            status: 201 // Created status code
        });
    })
}