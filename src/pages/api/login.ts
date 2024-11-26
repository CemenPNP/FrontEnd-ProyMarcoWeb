import useAuthStore from "@/stores/authStore"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
  const authStore = useAuthStore.getState()
  try {
    const body = await request.json()
    const response = await fetch("http://localhost:8080/loggin/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const data = await response.json()
      cookies.set("auth_token", data.token.token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      authStore.setAuthenticated(true)
      authStore.setUser({
        nombre: data.usuario.nombre,
        apellido: data.usuario.apellido,
        correo: data.usuario.correo,
      })
      return new Response(null, { status: 200 })
    } else {
      return new Response("Credenciales inválidas", { status: 401 })
    }
  } catch (error) {
    return new Response("Error interno del servidor", { status: 500 })
  }
}
