import { isAuthenticated } from '@/utils/supabase/server/queries';
import { redirect } from 'next/navigation';

export default async function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
