// import { auth } from "./auth"

// export default auth((req) => {
//     if (!req.auth && req.nextUrl.pathname === "/dashboard") {
//       const newUrl = new URL("/auth/login", req.nextUrl.origin)
//       return Response.redirect(newUrl)
//     }
//   })

//   export const config = {
//     matcher: ["/dashboard"]
//   };