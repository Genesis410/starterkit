import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users, subscriptions } from '@/db/schema';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe signature', { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const userId = subscription.metadata?.userId;

      if (!userId) {
        console.error('Missing userId in subscription metadata');
        break;
      }

      // Update subscription in database
      await db
        .insert(subscriptions)
        .values({
          id: subscription.id,
          userId: userId,
          status: subscription.status,
          priceId: subscription.items.data[0]?.price.id,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
          endedAt: subscription.ended_at ? new Date(subscription.ended_at * 1000) : null,
        })
        .onConflictDoUpdate({
          target: subscriptions.id,
          set: {
            status: subscription.status,
            priceId: subscription.items.data[0]?.price.id,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
            endedAt: subscription.ended_at ? new Date(subscription.ended_at * 1000) : null,
            updatedAt: new Date(),
          },
        });

      break;
    }
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error('Missing userId in session metadata');
        break;
      }

      // Update user with customer ID if not already set
      await db
        .update(users)
        .set({ 
          id: userId,
          // We'll use the session.customer as the stripe customer ID
        })
        .where(eq(users.id, userId));

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}