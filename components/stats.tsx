import { WordWithCategory } from '@/types';
import {
  getUserCategories,
  requireAuth
} from '@/utils/supabase/server/queries';
import { Card } from './ui/card';
import { CardHeader, CardTitle, CardContent } from './ui/card';

const getCategoryCounts = (words: WordWithCategory[] | null) => {
  const counts = new Map<string, number>();

  words?.forEach(word => {
    const categoryName = word.category?.name;
    if (categoryName) {
      counts.set(categoryName, (counts.get(categoryName) || 0) + 1);
    }
  });

  return counts;
};

export default async function Stats({ words }: { words: WordWithCategory[] }) {
  const { user } = await requireAuth();
  const { categories } = await getUserCategories();

  const wordsPerCategory = getCategoryCounts(words);

  console.log('wordsPerCategory', wordsPerCategory);

  const topCategories = Array.from(wordsPerCategory.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  console.log('topCategories', topCategories);

  // Calculate mastery metrics
  const totalMastery = words.reduce((sum, word) => sum + word.mastery, 0);
  const averageMastery =
    words.length > 0 ? Math.round(totalMastery / words.length) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {user.user_metadata.first_name}'s Vocabulary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Words</span>
              <span className="text-xl font-semibold">{words.length}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Categories</span>
              <span className="text-xl font-semibold">
                {categories?.length}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Mastery</span>
              <span className="text-xl font-semibold">{averageMastery}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {topCategories.length > 0 ? (
            <div className="space-y-4">
              {topCategories.map(([category, count]) => (
                <div
                  key={category}
                  className="flex justify-between items-center"
                >
                  <span className="text-muted-foreground">{category}</span>
                  <span className="text-xl font-semibold">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No categories yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
