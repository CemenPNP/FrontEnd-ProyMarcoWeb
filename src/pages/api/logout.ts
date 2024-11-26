import useAuthStore from "@/stores/authStore"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies }) => {
  cookies.set("auth_token", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  })
  const authStore = useAuthStore.getState()
  authStore.setAuthenticated(false)
  authStore.setUser(null)
  return new Response(null, { status: 200 })
}
