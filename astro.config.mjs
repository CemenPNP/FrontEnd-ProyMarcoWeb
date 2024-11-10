import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), auth()],
  output: 'server',
  // output: "server",
  adapter: vercel()
});