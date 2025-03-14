import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { APIResponses } from '../../components/debug/api-responses';
import WordCardContainer from '@/components/word-card-container';
import type { WordWithCategory } from '@/types';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const { data: words, error } = await supabase
    .from('words')
    .select(
      `
    *,
    category (
      name
    )
  `
    )
    .overrideTypes<WordWithCategory[], { merge: false }>();

  if (error) {
    console.error(error);
  }

  return (
    <>
      <APIResponses user={user} words={words} />
      <WordCardContainer words={words} />
    </>
  );
}
