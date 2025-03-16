import { getUserWords, requireAuth } from '@/utils/supabase/server/queries';
import { Library } from 'lucide-react';
import WordList from '@/components/word-list';
import NoWordsYet from '@/components/no-words-yet';
export default async function Words() {
  const { user } = await requireAuth();
  const { words } = await getUserWords();

  const heading = `${user.user_metadata.first_name}'s Vocabulary`;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-indigo-600/10 mb-4">
          <Library className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold">{heading}</h1>
        <p className="mt-2 text-muted-foreground">
          Browse, search, and manage your collection of words.
        </p>
      </div>
      {words && words.length > 0 ? <WordList words={words} /> : <NoWordsYet />}
    </div>
  );
}
