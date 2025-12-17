import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use the latest API version
  typescript: true,
});

// Create a customer in Stripe
export const createCustomer = async (
  email: string,
  name?: string,
  userId?: string
) => {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: userId ? { userId } : undefined,
  });
  
  return customer;
};

// Get a customer from Stripe
export const getCustomer = async (customerId: string) => {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
};

// Create a product in Stripe
export const createProduct = async (
  name: string,
  description: string,
  metadata?: Record<string, string>
) => {
  const product = await stripe.products.create({
    name,
    description,
    metadata,
  });
  
  return product;
};

// Create a price in Stripe
export const createPrice = async (
  productId: string,
  unitAmount: number, // amount in cents
  currency: string = 'usd',
  interval: 'day' | 'week' | 'month' | 'year',
  nickname?: string
) => {
  const price = await stripe.prices.create({
    product: productId,
    unit_amount: unitAmount,
    currency,
    recurring: {
      interval,
    },
    nickname,
  });
  
  return price;
};

// Create a checkout session
export const createCheckoutSession = async (
  customerId: string,
  priceId: string,
  mode: 'payment' | 'subscription' = 'subscription',
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
) => {
  const session = await stripe.checkout.sessions.create({
    mode,
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
  
  return session;
};

// Create a billing portal session
export const createBillingPortalSession = async (
  customerId: string,
  returnUrl: string
) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  
  return session;
};

// Get subscription details
export const getSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
};

// Cancel a subscription
export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.del(subscriptionId);
  return subscription;
};

// Update subscription
export const updateSubscription = async (
  subscriptionId: string,
  priceId: string
) => {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscriptionId,
        price: priceId,
      },
    ],
  });
  
  return subscription;
};