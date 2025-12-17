import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import DashboardContent from './DashboardContent';

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // If no user, redirect to login
    redirect('/auth/login');
  }

  return <DashboardContent user={user} />;
}