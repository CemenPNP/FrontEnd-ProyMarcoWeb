// auth.config.mjs
import Google from "@auth/core/providers/google"
import { defineConfig } from "auth-astro"

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.id_token) {
        token.idToken = account.id_token
      }
      return token
    },
    session: async ({ session, token }) => {
      session.jwt = token.idToken
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
