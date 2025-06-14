/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export default function RouteWrapper(asyncFun: () => Promise<any>) {
    return async function() {
        try {
            return await asyncFun();
        } catch (error: any) {
            console.error('Route Error:', error);

            const statusCode = error.statusCode || 500;
            const errorMessage = error.message || 'An unknown error occurred';

            return NextResponse.json({
                success: false,
                message: errorMessage,
                error: {
                    type: error.name || 'ServerError',
                    details: error.stack,
                    path: error.path || null
                }
            }, {
                status: statusCode
            });
        } finally {
            try {
                await prisma.$disconnect();
            } catch (disconnectError) {
                console.error('Prisma disconnect error:', disconnectError);
            }
        }
    }()
}