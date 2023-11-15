import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { createI18nMiddleware } from "next-international/middleware";

const PROTECTED_ROUTES = ["/dashboard", "/projects"];
export const config = {
  matcher: ["/((?!api|static|_next).*)"],
};

const I18nMiddlewareInstance = createI18nMiddleware({
  locales: ["en-US"],
  defaultLocale: "en-US",
  urlMappingStrategy: "rewrite",
});

function i18nMiddleware(request: NextRequest) {
  const i18nResponse: NextResponse = I18nMiddlewareInstance(request);
  return i18nResponse;
}

const authMiddleware = withAuth(
  function onSuccess(req) {
    return i18nMiddleware(req);
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const currentRoute =
    req.nextUrl.pathname.lastIndexOf("/") === 6
      ? req.nextUrl.pathname.slice(7)
      : req.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.find((r) =>
    currentRoute.startsWith(r)
  );

  return isProtectedRoute ? (authMiddleware as any)(req) : i18nMiddleware(req);
}
