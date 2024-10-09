import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl
    // console.log(`admin = ${process.env.ADMIN_ACCOUNT}`)


    if (!token && (url.pathname.startsWith('/create'))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    else if (token && (url.pathname.startsWith('/login'))) {
        return NextResponse.redirect(new URL('/create', request.url))
    }
}

export const config = {
    matcher: [
        '/create',
        '/login',
    ]
}