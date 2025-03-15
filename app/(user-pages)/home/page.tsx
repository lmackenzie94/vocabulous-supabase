import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Dumbbell, Library } from 'lucide-react';
import { BookMarked, Plus } from 'lucide-react';
import Link from 'next/link';
import { getUserWords } from '@/utils/supabase/server/queries';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Stats from '@/components/stats';

export default async function Home() {
  const { words } = await getUserWords();

  return (
    <div className="max-w-4xl mx-auto animate-scale-in">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="p-3 rounded-full bg-blue-600/10 mb-4">
          <BookMarked className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Vocabulous</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          Build your vocabulary one word at a time.
          <br />
          Add new words, review definitions, and practice until mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ActionCard
          title="Add Words"
          description="Add new words with definitions, examples, and categories."
          icon={<Plus className="h-5 w-5 text-green-600" />}
          buttonHref="/add"
          buttonText="Start Adding"
          buttonClassName="bg-green-600 text-white hover:bg-green-700"
          cardClassName="bg-gradient-to-br from-green-600/5 to-green-600/10 border-0"
        />
        <ActionCard
          title="View Words"
          description="Browse, search, and manage your vocabulary collection."
          icon={<Library className="h-5 w-5 text-indigo-600" />}
          buttonHref="/words"
          buttonText="View Collection"
          buttonClassName="bg-indigo-600 text-white hover:bg-indigo-700"
          cardClassName="bg-gradient-to-br from-indigo-600/5 to-indigo-600/10 border-0"
        />
        <ActionCard
          title="Practice"
          description="Test your knowledge with practice sessions."
          icon={<Dumbbell className="h-5 w-5 text-red-600" />}
          buttonHref="/practice"
          buttonText="Start Practice"
          buttonClassName="bg-red-600 text-white hover:bg-red-700"
          cardClassName="bg-gradient-to-br from-red-600/5 to-red-600/10 border-0"
        />
      </div>

      {words && words.length > 0 ? (
        <Stats words={words} />
      ) : (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">Get Started</h3>
              <p className="text-muted-foreground mb-6">
                Your vocabulary collection is empty. Start by adding your first
                word.
              </p>
              <Button asChild size="lg">
                <Link href="/add">Add Your First Word</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonClassName?: string;
  cardClassName?: string;
}

const ActionCard = ({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
  buttonClassName,
  cardClassName
}: ActionCardProps) => {
  return (
    <Card className={cn('flex flex-col justify-between', cardClassName)}>
      <div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xl">
            <div className="mr-2 p-1.5 rounded-md bg-black/5">{icon}</div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-between">
          <p className="mb-4 text-muted-foreground">{description}</p>
        </CardContent>
      </div>

      <CardFooter>
        <Button asChild className={cn('w-full text-base', buttonClassName)}>
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
