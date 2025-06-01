import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateCookies } from "./libs/session";
import { cookies } from "next/headers";
import { createI18nMiddleware } from "next-international/middleware";
export default async function middleware(request: NextRequest) {
    // const authRoutes = '/auth'
    // const protectedRoute = ['/']
    // const currentPath = request.nextUrl.pathname
    // const isProtectedRoute = protectedRoute.includes(currentPath)

    // if (isProtectedRoute && !currentPath.startsWith(authRoutes)) {
    //     const cookie = (await cookies()).get('session')?.value
    //     const session = await decrypt(cookie)
    //     if (!session?.userId) {
    //         return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    //     }
    // }
    // if (currentPath.startsWith(authRoutes)) {
    //     const cookie = (await cookies()).get('session')?.value
    //     const session = await decrypt(cookie)
    //     if (session?.userId) {
    //         return NextResponse.redirect(new URL('/home', request.nextUrl))
    //     }
    // }

    await updateCookies(request)
    return I18nMiddleware(request)

}

const I18nMiddleware = createI18nMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    urlMappingStrategy: 'rewrite'   
})

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}