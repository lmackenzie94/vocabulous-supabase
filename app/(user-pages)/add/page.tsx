import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getUserCategories } from '@/utils/supabase/server/queries';
import { addWordAction } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';
import CategorySelect from '@/components/category-select';
import AddWordForm from '@/components/add-word-form';
import { BookPlus } from 'lucide-react';

export default async function AddWordPage() {
  const { categories } = await getUserCategories();

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-green-600/10 mb-4">
          <BookPlus className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Add New Word</h1>
        <p className="mt-2 text-muted-foreground">
          Expand your vocabulary by adding new words with their definitions.
        </p>
      </div>
      <AddWordForm categories={categories} />
    </div>
  );
}
