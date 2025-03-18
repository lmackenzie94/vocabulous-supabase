'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pen, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { WordWithCategory } from '@/types';
import { deleteWordAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { useState } from 'react';
import ProgressButton from './progess-button';

interface WordCardProps {
  word: WordWithCategory;
  isListView?: boolean;
}

const DELETING_TIMEOUT = 4; // seconds
export default function WordCard({ word, isListView }: WordCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (wordId: string) => {
    setIsDeleting(true);
    const { word, error } = await deleteWordAction(wordId);
    if (!word || error) {
      toast.error(error?.message || 'Failed to delete word');
      setIsDeleting(false);
      return;
    }

    toast.success(`"${word.word}" has been removed from your vocabulary`);
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery < 30) return 'bg-red-100 text-red-800';
    if (mastery < 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getMasteryLabel = (mastery: number) => {
    if (mastery < 30) return 'Beginner';
    if (mastery < 70) return 'Familiar';
    return 'Mastered';
  };

  return isListView ? (
    <div
      className={cn(
        'flex items-center justify-between py-3 px-4 shadow-sm transition-all duration-200 bg-card rounded-lg',
        isDeleting && 'border border-red-400 border-dashed'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 min-w-0',
          isDeleting && 'opacity-50'
        )}
      >
        <div className="flex-shrink-0">
          <Badge className={cn('h-6', getMasteryColor(word.mastery))}>
            {getMasteryLabel(word.mastery)}
          </Badge>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-medium">{word.word}</h3>
            <Badge
              variant="outline"
              className="text-xs bg-secondary text-secondary-foreground flex-shrink-0"
            >
              {word.category.name}
            </Badge>
          </div>
          <p className="text-sm text-foreground/75">{word.definition}</p>
          {word.example && (
            <p className="text-xs italic text-muted-foreground mt-1.5">
              "{word.example}"
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-1 ml-2 flex-shrink-0 items-center">
        {isDeleting ? (
          <ProgressButton
            duration={DELETING_TIMEOUT}
            onClick={handleCancelDelete}
            onComplete={() => handleDelete(word.id)}
          >
            <p>Cancel</p>
          </ProgressButton>
        ) : (
          <>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/edit/${word.id}`}>
                <Pen className="h-4 w-4 text-blue-400 hover:text-blue-500" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleting(true)}
              className="h-8 w-8 text-red-400 hover:text-red-500"
              title="Delete"
              disabled={isDeleting}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </>
        )}
      </div>
    </div>
  ) : (
    <Card
      className={cn(
        'border flex flex-col justify-between transition-colors duration-200',
        isDeleting && 'border-red-400 border-dashed'
      )}
    >
      <div
        className={cn(
          'transition-opacity duration-200',
          isDeleting && 'opacity-50'
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-2 bg-secondary text-secondary-foreground">
                {word.category.name}
              </Badge>
            </div>
            <Badge className={cn('ml-2', getMasteryColor(word.mastery))}>
              {getMasteryLabel(word.mastery)}
            </Badge>
          </div>
          <CardTitle className="text-xl">{word.word}</CardTitle>
          <CardDescription className="mt-1 text-sm sm:text-base">
            {word.definition}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3 pt-0">
          {word.example && (
            <div className="mt-2">
              <p className="italic text-xs sm:text-sm">"{word.example}"</p>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="!pb-1 !pt-1 mt-2 border-t border-border border-dashed flex justify-end bg-primary/5">
        {isDeleting ? (
          <ProgressButton
            duration={DELETING_TIMEOUT}
            onClick={handleCancelDelete}
            onComplete={() => handleDelete(word.id)}
          >
            <p>Cancel</p>
          </ProgressButton>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-blue-400 hover:text-blue-500 text-sm"
              title="Edit"
            >
              <Link href={`/edit/${word.id}`}>
                <Pen className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleting(true)}
              className="text-red-400 hover:text-red-500 text-sm"
              title="Delete"
              disabled={isDeleting}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
