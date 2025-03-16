import UserHeader from './user-header';
import NoUserHeader from './no-user-header';
import { cn } from '@/lib/utils';
import { getAuth } from '@/utils/supabase/server/queries';

const BaseHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header
      className={cn(
        'fixed w-full bg-header border-b border-border transition-all duration-300 ease-in-out z-50 py-4'
        // scrolled ? "py-3 shadow-md" : "py-5"
      )}
    >
      {children}
    </header>
  );
};

export default async function Header() {
  const { user } = await getAuth();

  return (
    <BaseHeader>
      {user ? <UserHeader user={user} /> : <NoUserHeader />}
    </BaseHeader>
  );
}
