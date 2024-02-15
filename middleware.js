import { NextResponse } from 'next/server'


export function middleware(request) {
    const token = request.cookies.get('userToken')?.value

    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
        if (token) {
            return NextResponse.redirect(new URL('/banner', request.url))
        }
    } else {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }


}


export const config = {
    matcher: ['/login', '/register', '/banner/:path*', '/properties/:path*', '/testimonials/:path*', '/'],
}