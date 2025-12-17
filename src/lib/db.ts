import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users, products, prices, subscriptions } from '@/db/schema';

// Disable prefetch as it's not supported in Edge runtimes
const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client);

// Export types based on the schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Price = typeof prices.$inferSelect;
export type NewPrice = typeof prices.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;