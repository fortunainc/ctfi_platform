import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
  '/dashboard(.*)',
  '/channels(.*)',
  '/contributions(.*)',
  '/backstage(.*)',
  '/backstage/new(.*)',
  '/backstage/category(.*)',
  '/backstage/post(.*)',
  '/jobs(.*)',
  '/pricing(.*)',
  '/budget-database(.*)',
  '/training(.*)',
  '/credits(.*)',
  '/onboarding(.*)',
  '/admin(.*)',
  '/analytics(.*)',
  '/insights(.*)',
  '/ai-vs-reality(.*)',
  '/founder(.*)',
  '/patterns(.*)',
  '/postmortems(.*)',
  '/submit(.*)',
  '/urgent-help(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};