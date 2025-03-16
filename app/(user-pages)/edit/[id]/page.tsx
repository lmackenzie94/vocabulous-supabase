import {
  getUserCategories,
  getUserWordById
} from '@/utils/supabase/server/queries';

import EditWordForm from '@/components/edit-word-form';
import { BookPlus } from 'lucide-react';

export default async function EditWordPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { word, error } = await getUserWordById(id);
  const { categories } = await getUserCategories();

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-blue-600/10 mb-4">
          <BookPlus className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold">Edit Word</h1>
      </div>
      {word && <EditWordForm categories={categories} word={word} />}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
