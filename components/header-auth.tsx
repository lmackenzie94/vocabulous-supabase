import { signOutAction } from '@/app/actions';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import { ThemeSwitcher } from './theme-switcher';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          Hey, {user.email}!
          <Link href="/practice">
            <Button variant="default">Practice</Button>
          </Link>
          <form action={signOutAction}>
            <Button type="submit" variant="white">
              Sign out
            </Button>
          </form>
        </>
      ) : (
        <>
          <Button asChild size="sm" variant={'outline'}>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" variant={'default'}>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </>
      )}
      <ThemeSwitcher />
    </div>
  );
}
