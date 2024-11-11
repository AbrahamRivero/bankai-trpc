import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/shopping-cart(.*)"]);

const isProtectedAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, request) => {
  // Restrict admin routes to users with specific permissions
  /*   if (isProtectedAdminRoute(request)) {
    auth().protect((has) => {
      return has({ role: "admin" });
    });
  } */
  // Restrict organization routes to signed in users
  if (isProtectedRoute(request)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
