import { getSession } from "auth-astro/server"
import type { MiddlewareHandler } from "astro"

export const onRequest: MiddlewareHandler = async (context, next) => {
  const protectedRoutes = ["/usuario"]

  // Obtener la sesión usando astro-auth
  const session = await getSession(context.request)
  const user = session?.user

  console.log("Usuario en la sesión:", user)

  // Si el usuario está autenticado y trata de acceder a "/login", redirigir a "/"
  if (context.url.pathname === "/login" && user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    })
  }

  // Si la ruta está protegida y no hay sesión (usuario no autenticado)
  if (protectedRoutes.includes(context.url.pathname) && !user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    })
  }

  // Si no aplica ninguna de las condiciones anteriores, continuar con la solicitud
  return next()
}
