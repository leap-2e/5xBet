// src/middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const { pathname } = req.nextUrl;

  const profileCreated = (sessionClaims?.publicMetadata as { profileCreated?: boolean })?.profileCreated;

  // ✅ 1: Хэрэв нэвтэрсэн хэрэглэгч бол /signIn, /signUp руу орж болохгүй
  if (userId) {
    if (pathname.startsWith("/signIn") || pathname.startsWith("/signUp")) {
      // profileCreated шалгаж хаяна
      if (profileCreated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/createProfile", req.url));
      }
    }
  }

  // ✅ 2: Нэвтрээгүй хэрэглэгчид /dashboard, /createProfile руу орж болохгүй
  if (!userId) {
    if (
      pathname.startsWith("/home") ||
      pathname.startsWith("/createProfile")
    ) {
      return NextResponse.redirect(new URL("/signIn", req.url));
    }
    return NextResponse.next();
  }

  // ✅ 3: Нэвтэрсэн ч profile байхгүй хэрэглэгч /dashboard руу орох оролдвол
  // if (userId && !profileCreated) {
  //   if (pathname.startsWith("/dashboard")) {
  //     return NextResponse.redirect(new URL("/createProfile", req.url));
  //   }
  // }

  // ✅ БУСАД БҮХ ТОХИОЛДОЛД зөвшөөрнө
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/', 
    '/signIn', 
    '/signUp', 
    '/dashboard', 
    '/createProfile'
  ],
};