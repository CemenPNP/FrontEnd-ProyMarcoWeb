import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
  // cookies.set("auth_token", "token.prueba", {
  //   path: "/",
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  // })
  // return new Response(null, { status: 200 })
  try {
    const body = await request.json()
    const response = await fetch("http://localhost:8080/loggin/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const data = await response.json()
      cookies.set("auth_token", data.token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })

      return new Response(null, { status: 200 })
    } else {
      return new Response("Credenciales inválidas", { status: 401 })
    }
  } catch (error) {
    return new Response("Error interno del servidor", { status: 500 })
  }
}
