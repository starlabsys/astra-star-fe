import { NextRequest, NextResponse } from "next/server";

import withAuth from "./middleware/withAuth";

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/pkb", "/history-pkb/:path*"],
};

export default withAuth(mainMiddleware, [
  "/",
  "/dashboard",
  "pkb",
  "/history-pkb",
]);
