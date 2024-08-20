import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
