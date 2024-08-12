// import {
//   NextFetchEvent,
//   NextMiddleware,
//   NextRequest,
//   NextResponse,
// } from "next/server";
// import { cookies } from "next/headers";

// export default function withAuth(
//   middleware: NextMiddleware,
//   requireAuth: string[] = [],
// ) {
//   return async (req: NextRequest, next: NextFetchEvent) => {
//     const pathName = req.nextUrl.pathname;

//     if (requireAuth.includes(pathName)) {
//       const cookieStore = cookies();
//       const token = cookieStore.get("token");

//       if (!token) {
//         const url = new URL("/login", req.url);

//         url.searchParams.set("callbackUrl", encodeURI(req.url));

//         return NextResponse.redirect(url);
//       }
//     }

//     return middleware(req, next);
//   };
// }
