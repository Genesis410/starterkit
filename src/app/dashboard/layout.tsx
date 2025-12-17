import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { DashboardNav } from './DashboardNav';
import { UserAccountNav } from './UserAccountNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // If no user, redirect to login
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r bg-muted/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-primary rounded"></div>
              <span className="font-bold">SaaS Starter</span>
            </div>
          </div>
          <div className="flex-1">
            <DashboardNav />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="md:hidden">
            <div className="mr-2 h-6 w-6 bg-primary rounded"></div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <UserAccountNav user={user} />
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}