import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // These will be handled by Supabase, so we use placeholders
    // In a real environment, you'd use your Supabase connection string
    url: process.env.DATABASE_URL || '',
  }
});