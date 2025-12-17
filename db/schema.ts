import { pgTable, serial, text, varchar, integer, timestamp, boolean, json, pgEnum } from 'drizzle-orm/pg-core';

// Enums for our database
export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'trialing',
  'active', 
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid'
]);

export const pricingTypeEnum = pgEnum('pricing_type', [
  'one_time',
  'recurring'
]);

export const pricingPlanIntervalEnum = pgEnum('pricing_plan_interval', [
  'day',
  'week',
  'month',
  'year'
]);

// Users table
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  fullName: varchar('full_name', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  billingAddress: json('billing_address'),
  paymentMethod: json('payment_method'),
});

// Products table
export const products = pgTable('products', {
  id: varchar('id', { length: 255 }).primaryKey(),
  active: boolean('active'),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  image: varchar('image', { length: 255 }),
  metadata: json('metadata'),
});

// Prices table
export const prices = pgTable('prices', {
  id: varchar('id', { length: 255 }).primaryKey(),
  productId: varchar('product_id', { length: 255 }).references(() => products.id),
  active: boolean('active'),
  description: varchar('description', { length: 255 }),
  unitAmount: integer('unit_amount'),
  currency: varchar('currency', { length: 3 }), // e.g., USD
  type: pricingTypeEnum('type'),
  interval: pricingPlanIntervalEnum('interval'),
  intervalCount: integer('interval_count'),
  trialPeriodDays: integer('trial_period_days'),
  metadata: json('metadata'),
});

// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  status: subscriptionStatusEnum('status'),
  metadata: json('metadata'),
  priceId: varchar('price_id', { length: 255 })
    .notNull()
    .references(() => prices.id),
  quantity: integer('quantity').default(1),
  cancelAtPeriodEnd: boolean('cancel_at_period_end'),
  created: timestamp('created').defaultNow().notNull(),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  endedAt: timestamp('ended_at'),
  cancelAt: timestamp('cancel_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User subscriptions relationship
export const userSubscriptions = {
  user: users,
  subscription: subscriptions,
};

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Price = typeof prices.$inferSelect;
export type NewPrice = typeof prices.$inferInsert;

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;