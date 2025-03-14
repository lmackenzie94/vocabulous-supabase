'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { WordWithCategory } from '@/types';

interface WordCardProps {
  word: WordWithCategory;
  isListView?: boolean;
}

export default function WordCard({
  word: wordObject,
  isListView = false
}: WordCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const { word, definition, example_sentence, category } = wordObject;

  if (isListView) {
    return (
      <Card className="w-full transition-all duration-200 hover:shadow-md">
        <div className="flex flex-row items-center p-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{word}</h3>
              <Badge variant="outline" className="h-5">
                {category?.name}
              </Badge>
            </div>

            <p
              className={`mt-1 text-sm ${isRevealed ? '' : 'blur-sm select-none'} transition-all duration-300`}
            >
              {definition}
            </p>

            <p className={`mt-1 text-sm italic transition-all duration-300`}>
              {example_sentence}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="ml-4 shrink-0"
            onClick={() => setIsRevealed(!isRevealed)}
          >
            {isRevealed ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">{isRevealed ? 'Hide' : 'Reveal'}</span>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">{word}</h3>
          <Badge variant="outline">{category?.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p
            className={`${isRevealed ? '' : 'blur-sm select-none'} transition-all duration-300`}
          >
            {definition}
          </p>
        </div>
        <p className="italic text-sm">{example_sentence}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsRevealed(!isRevealed)}
        >
          {isRevealed ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Reveal
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
