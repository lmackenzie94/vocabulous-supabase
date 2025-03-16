import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { APIResponses } from '../../../components/debug/api-responses';
import WordCardContainer from '@/components/word-list';
import type { WordWithCategory } from '@/types';
import { Dumbbell } from 'lucide-react';
import { getUserWords } from '@/utils/supabase/server/queries';
import NoWordsYet from '@/components/no-words-yet';
// import PracticeSession from '@/components/practice-session';

export default async function PracticePage() {
  const { words } = await getUserWords();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-red-600/10 mb-4">
          <Dumbbell className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">Practice</h1>
        <p className="mt-2 text-muted-foreground">
          Review and practice your vocabulary to improve retention.
        </p>
      </div>
      {words && words.length > 0 ? (
        // <PracticeSession />
        <p>Practice...</p>
      ) : (
        <NoWordsYet />
      )}
    </div>
  );
}
