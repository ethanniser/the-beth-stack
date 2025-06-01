import type { Config } from "drizzle-kit";
import { config } from "dotenv";

// Load environment variables from .env file
config({ path: ".env" });

export default {
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  verbose: true,
  strict: true,
} satisfies Config;
