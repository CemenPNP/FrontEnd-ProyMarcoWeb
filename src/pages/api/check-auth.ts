import useAuthStore from "@/stores/authStore"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies }) => {
  const authToken = cookies.get("auth_token")?.value
  const authStore = useAuthStore.getState()

  if (!authToken || !authStore.isAuthenticated) {
    return new Response(JSON.stringify({ authenticated: false, user: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Devolver estado de autenticación y datos del usuario del authStore
  return new Response(
    JSON.stringify({
      authenticated: true,
      user: authStore.user, // Nombre, apellido, correo
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}

// import type { APIRoute } from "astro"

// export const GET: APIRoute = async ({ cookies }) => {
//   const authToken = cookies.get("auth_token")?.value
//   const authenticated = Boolean(authToken)
//   return new Response(JSON.stringify({ authenticated }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   })
// }
