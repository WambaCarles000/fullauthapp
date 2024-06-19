import { auth } from "./auth";
import { apiAuthPrefix, publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";

import  {NextResponse} from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn =!!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  return null;
});