'use client';

import { useState } from 'react';
import WordCard from './word-card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import type { WordWithCategory } from '@/types';

interface WordCardContainerProps {
  words: WordWithCategory[] | null;
}

export default function WordCardContainer({
  words = null
}: WordCardContainerProps) {
  const [isGridView, setIsGridView] = useState(true);

  const displayWords = words ? words : [];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={isGridView ? 'default' : 'outline'}
            className="rounded-l-md rounded-r-none"
            onClick={() => setIsGridView(true)}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={!isGridView ? 'default' : 'outline'}
            className="rounded-r-md rounded-l-none"
            onClick={() => setIsGridView(false)}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className={
          isGridView ? 'grid gap-6 md:grid-cols-2' : 'flex flex-col space-y-2'
        }
      >
        {displayWords.map((word, index) => (
          <WordCard key={index} word={word} isListView={!isGridView} />
        ))}
      </div>
    </div>
  );
}
