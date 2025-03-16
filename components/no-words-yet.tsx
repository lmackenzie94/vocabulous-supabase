import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NoWordsYet() {
  return (
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
  );
}
