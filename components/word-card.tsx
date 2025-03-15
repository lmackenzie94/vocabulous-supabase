'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { WordWithCategory } from '@/types';
import { SubmitButton } from './submit-button';
import { deleteWordAction } from '@/app/actions';

interface WordCardProps {
  word: WordWithCategory;
  isListView?: boolean;
}

export default function WordCard({
  word: wordObject,
  isListView = false
}: WordCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const { word, definition, example, category, mastery } = wordObject;

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
              {example}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="h-5">
                Mastery: {mastery}
              </Badge>
            </div>
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
          <form action={deleteWordAction} className="ml-2">
            <input type="hidden" name="word_id" value={wordObject.id} />
            <SubmitButton
              type="submit"
              variant="destructive"
              size="sm"
              pendingText="Deleting..."
            >
              <Trash className="h-4 w-4" />
            </SubmitButton>
          </form>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md flex flex-col justify-between">
      <div>
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
          <p className="italic text-sm">{example}</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-5">
              Mastery: {mastery}
            </Badge>
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex flex-row gap-2">
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
        <form action={deleteWordAction}>
          <input type="hidden" name="word_id" value={wordObject.id} />
          <SubmitButton
            type="submit"
            variant="destructive"
            size="sm"
            pendingText="Deleting..."
          >
            <Trash className="h-4 w-4" />
          </SubmitButton>
        </form>
      </CardFooter>
    </Card>
  );
}
