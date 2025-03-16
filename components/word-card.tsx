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

interface WordCardProps {
  word: WordWithCategory;
  isListView?: boolean;
}

export default function WordCard({ word, isListView }: WordCardProps) {
  const handleDelete = async (wordId: string) => {
    const { word, error } = await deleteWordAction(wordId);
    if (!word || error) {
      console.error(error);
      toast.error('Failed to delete word');
      return;
    }

    toast.success(`"${word.word}" has been removed from your vocabulary`);
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
    <div className="flex items-center justify-between py-3 px-4 shadow-sm transition-all duration-200 bg-card rounded-lg">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0">
          <Badge className={cn('h-6', getMasteryColor(word.mastery))}>
            {getMasteryLabel(word.mastery)}
          </Badge>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{word.word}</h3>
            <Badge
              variant="outline"
              className="text-xs bg-secondary text-secondary-foreground flex-shrink-0"
            >
              {word.category.name}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{word.definition}</p>
          {word.example && (
            <p className="text-xs italic text-muted-foreground mt-0.5">
              "{word.example}"
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-1 ml-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8 text-blue-400 hover:text-blue-500"
        >
          <Link href={`/edit/${word.id}`}>
            <Pen className="h-4 w-4" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(word.id)}
          className="h-8 w-8 text-red-400 hover:text-red-500"
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  ) : (
    <Card className="border flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-2 bg-secondary text-secondary-foreground">
                {word.category.name}
              </Badge>
              <CardTitle className="text-xl">{word.word}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {word.definition}
              </CardDescription>
            </div>
            <Badge className={cn('ml-2', getMasteryColor(word.mastery))}>
              {getMasteryLabel(word.mastery)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-3 pt-0">
          {word.example && (
            <div className="mt-2">
              <p className="italic text-sm">"{word.example}"</p>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-blue-500 text-sm"
        >
          <Link href={`/edit/${word.id}`}>
            <Pen className="h-4 w-4 mr-1" />
            Edit
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(word.id)}
          className="text-muted-foreground hover:text-destructive text-sm"
        >
          <Trash className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
