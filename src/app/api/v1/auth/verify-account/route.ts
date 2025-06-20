import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import RouteWrapper from "@/libs/RouteWrapper";
import { verifySession } from "@/libs/session";
import { sendEmail } from "@/libs/sendemail";
import { generateEmailTemplate } from "@/libs/htmlEmail";
const prisma = new PrismaClient()

export async function GET() {
    return RouteWrapper(async () => {
        await prisma.$connect();
        const session = await verifySession()
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "Session not found or expired"
            }, {
                status: 401
            });
        }
        const userId = session.userId as string
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "User ID not found in session"
            }, {
                status: 401
            });
        }
        const userInfo = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!userInfo) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "User not found with this ID"
            }, {
                status: 404
            });
        }
        if (userInfo.isVerified) {
        return NextResponse.json({
            success: false,
            message: "Account already verified",
            error: "User account is already verified"
        }, {
            status: 400
        });
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await prisma.verificationCode.deleteMany({
            where: {
                email: userInfo.email
            }
        })
        await prisma.verificationCode.create({
            data: {
                email: userInfo.email,
                code: code,
                expiresAt: new Date(Date.now() + 1024 * 60 * 60),
            }
        });

        await sendEmail(
            userInfo.email,
            'Verify Your Account',
            generateEmailTemplate({
                title: 'Verify Your Account',
                message: 'Please use the following code to verify your account:',
                code: code,
                linkSite: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                name: userInfo.name
            })

        )
        return NextResponse.json({
            success: true,
            message: "Verification code generated successfully",
            data: null
        }, {
            status: 200
        });
    })
}

export async function POST(request: NextRequest) {
    return RouteWrapper(async () => {
        await prisma.$connect();
        const session = await verifySession()
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "Session not found or expired"
            }, {
                status: 401
            });
        }
        const userId = session.userId as string
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "User ID not found in session"
            }, {
                status: 401
            });
        }
        const userInfo = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!userInfo) {
            return NextResponse.json({
                success: false,
                message: "Authentication failed",
                error: "User not found with this ID"
            }, {
                status: 404
            });
        }
        if (userInfo.isVerified) {
            return NextResponse.json({
                success: false,
                message: "Account is already verified",
                error: "User account has already been verified"
            }, {
                status: 400
            });

        }
        const dataReq = await request.json()
        const code = dataReq.code
        
        if (!code) {
            return NextResponse.json({
                success: false,
                message: "Verification code is required",
                error: "Code field is missing"
            }, {
                status: 400
            });
        }
        const verifyMessage = await prisma.verificationCode.findFirst({
            where: {
                email: userInfo.email
            }
        })
        if (!verifyMessage) {
            return NextResponse.json({
                success: false,
                message: "No verification code found",
                error: "Verification code not found for this email"
            }, {
                status: 404
            });
        }

        if (verifyMessage.expiresAt && new Date() > verifyMessage.expiresAt) {
            return NextResponse.json({
                success: false,
                message: "Verification code has expired",
                error: "Code expired"
            }, {
                status: 400
            });
        }
        if (verifyMessage.code !== code) {
            return NextResponse.json({
                success: false,
                message: "Invalid verification code",
                error: "Code mismatch"
            }, {
                status: 400
            });
        }
        await prisma.user.update({
            where: {
                id: userInfo.id
            },
            data: {
                isVerified: true
            }
        })
        await prisma.verificationCode.delete({
            where: {
                id: verifyMessage.id
            }
        })
        return NextResponse.json({
            success: true,
            message: "Account verified successfully",
            data: {
                user: userInfo
            }
        }, {
            status: 200
        });

    })

}