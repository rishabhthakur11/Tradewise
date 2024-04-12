import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicPath = path === '/auth/login' || path === '/auth/signup' || path === '/auth/forgetpassword' || path === '/auth/resetpassword' || path === '/'
    const accessToken = req.cookies.get('accessToken')
    //TODO: takeout user from local or useAuthContext

    // use the session management to check if the user is authenticated


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
