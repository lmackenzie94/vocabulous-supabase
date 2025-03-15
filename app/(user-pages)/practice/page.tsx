import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { APIResponses } from '../../../components/debug/api-responses';
import WordCardContainer from '@/components/word-list';
import type { WordWithCategory } from '@/types';

export default async function PracticePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Practice</h2>
    </div>
  );
}
