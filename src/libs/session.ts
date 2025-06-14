/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import "server-only"

const key = new TextEncoder().encode(process.env.SECRET_AUTH)
export const encrypt = async (payload: any) => {
    return await new SignJWT(payload).
        setProtectedHeader({
            alg: "HS256"
        })
        .setIssuedAt()
        .setExpirationTime('30day')
        .sign(key)
}
export const decrypt = async (session: string | undefined) => {
    try {
        if (!session || typeof session !== 'string' || session.trim() === '') {
            return null
        }
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log(error);
        return null
    }
}

export const createSession = async (userId?: string) => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({
        userId,
        expires
    });

    (await cookies()).set('session', session, {
        sameSite: true,
        path: '/',
        expires,
        httpOnly: true
    })
}
export const verifySession = async () => {
    const userCookies = (await cookies()).get('session')?.value
    
    if (!userCookies) {
        return
    }
    const session = await decrypt(userCookies)
    return session
}
export const updateCookies = async (request: NextRequest) => {
    const session = request.cookies.get('session')?.value
    if (!session) {
        return
    }
    const parsed = await decrypt(session)
    if (!parsed) {
        return
    }
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: 'session',
        httpOnly: true,
        expires: parsed.expires as Date,
        value: await encrypt(parsed)
    })
    return res
}
export const deleteSession = async () => {
    (await cookies()).delete('session')
    return true
}