# SaaS Starter Kit

A comprehensive SaaS starter kit built with Next.js 15, Supabase, Stripe, and more.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe
- **Deployment**: Vercel

## Features

- User authentication with email/password and OAuth (Google, GitHub, etc.)
- Subscription management with Stripe
- File uploads with Supabase Storage
- Responsive UI with shadcn/ui components
- Middleware for protected routes
- Error handling and loading states
- Vercel optimized deployment

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Genesis410/starterkit.git
   cd starterkit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Database
   DATABASE_URL=your_supabase_database_url

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Stripe webhook endpoint: https://yourdomain.com/api/stripe/webhook
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Get your Project URL and anon key from Project Settings
3. Add them to your environment variables
4. Set up auth providers (Google, GitHub, etc.) in Auth Settings
5. Create the required database tables using the Drizzle schema

### Stripe Setup

1. Go to [Stripe](https://stripe.com) and create an account
2. Get your Secret Key and add it to environment variables
3. Create a webhook endpoint for `https://yourdomain.com/api/stripe/webhook`
4. Listen for subscription events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
5. Get the webhook signing secret and add it to your environment variables


## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `DATABASE_URL` - Your database connection string
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook signing secret

## Database Schema

The starter kit includes a pre-defined schema for users, products, prices, and subscriptions. You can find the schema definition in `db/schema.ts`.

## API Routes

- `POST /api/stripe/webhook` - Stripe webhook endpoint for subscription events
- `POST /api/auth/callback` - OAuth callback endpoint

## Project Structure

```bash
saas-starter/
├── components/         # React components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   └── dashboard/      # Dashboard components
├── lib/                # Utility functions and clients
├── db/                 # Database schema and migrations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── workers/            # Cloudflare Workers code
├── app/                # Next.js 13+ App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── pricing/        # Pricing page
└── public/             # Static assets
```

## Deployment

### Vercel

1. Push your code to a Git repository
2. Go to [Vercel](https://vercel.com) and create a new project
3. Connect your Git repository
4. Add the environment variables in Vercel dashboard
5. Deploy!

### Environment Variables on Vercel

When deploying to Vercel, make sure to set all the required environment variables in the project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Useful Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server

## Troubleshooting

- If you get an error with the database client, make sure your `DATABASE_URL` is correctly set
- For authentication errors, verify your Supabase project keys and auth configuration
- For Stripe errors, check that your webhook is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
