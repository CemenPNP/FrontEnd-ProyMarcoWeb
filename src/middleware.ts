// import { getSession } from "auth-astro/server"
// import type { MiddlewareHandler } from "astro"

// export const onRequest: MiddlewareHandler = async (context, next) => {
//   const protectedRoutes = ["/usuario"]
//   const session = await getSession(context.request)
//   const user = session?.user

//   if (context.url.pathname === "/login" && user) {
//     return new Response(null, {
//       status: 302,
//       headers: {
//         Location: "/",
//       },
//     })
//   }

//   if (protectedRoutes.includes(context.url.pathname) && !user) {
//     return new Response(null, {
//       status: 302,
//       headers: {
//         Location: "/login",
//       },
//     })
//   }

//   return next()
// }
