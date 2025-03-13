import { defineConfig } from "drizzle-kit"
import { env } from "./data/env/server"

export default defineConfig({
 out: "./drizzle/migrations",
 schema: "./drizzle/schema.ts",
 strict: true,
 verbose: true,
 dialect: "postgresql",
 dbCredentials: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: 5432,
    ssl: false,
  },
})