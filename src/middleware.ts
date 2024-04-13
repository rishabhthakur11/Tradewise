import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicPath = path === '/auth/login' || path === '/auth/signup' || path === '/auth/forgetpassword' || path === '/auth/otp' || path === '/'
    const accessToken = req.cookies.get('accessToken')
    if (isPublicPath && !accessToken) {
        return NextResponse.next()
    } else if (isPublicPath && accessToken) {
        return NextResponse.redirect(new URL('/stocks/user/explore', req.nextUrl))
    } else if (!isPublicPath && !accessToken) {
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
