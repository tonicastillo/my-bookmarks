import { defineConfig } from 'astro/config';
import node from "@astrojs/node";

import react from "@astrojs/react";
import vercelEdge from "@astrojs/vercel/edge"

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercelEdge(),
  integrations: [react()]
});