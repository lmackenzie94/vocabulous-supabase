import { getAuth, isAuthenticated } from '@/utils/supabase/server/queries';
import { redirect } from 'next/navigation';

export default async function Home() {
  if (await isAuthenticated()) {
    return redirect('/home');
  } else {
    return redirect('/sign-in');
  }
}
