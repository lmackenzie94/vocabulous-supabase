import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { APIResponses } from '../../components/debug/api-responses';
import { CategorySelect } from '@/components/category-select';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const { data: words, error } = await supabase.from('words').select(`
    *,
    categories (
      name
    )
  `);

  if (error) {
    console.error(error);
  }

  // get user categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', user.id);

  if (categoriesError) {
    console.error(categoriesError);
  }

  console.log('User categories', categories);

  const formattedCategories = categories?.map(category => ({
    value: category.id.toString(),
    label: category.name
  }));

  const addWord = async (formData: FormData) => {
    'use server';
    const supabase = await createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect('/sign-in');
    }

    console.log('User', user.id);

    const { word, definition, example_sentence, category } =
      Object.fromEntries(formData);

    const { data, error } = await supabase
      .from('words')
      .insert({
        word,
        definition,
        example_sentence,
        category,
        user_id: user.id
      })
      .select();

    if (error) {
      console.error('Error adding word', error);
    }

    console.log('Word added', data);
  };

  return (
    <>
      <APIResponses user={user} words={words} />

      {/* big form input to add a word, definition, example sentence, and optional category dropdown */}
      <div className="max-w-xl w-full mx-auto">
        <form
          id="add-word-form"
          action={addWord}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Word"
            name="word"
            className="px-4 py-2 bg-black/5 rounded-md"
            required
          />
          <textarea
            placeholder="Definition"
            name="definition"
            className="px-4 py-2 bg-black/5 rounded-md"
            required
          />
          <textarea
            placeholder="Example sentence"
            name="example_sentence"
            className="px-4 py-2 bg-black/5 rounded-md"
          />
          <CategorySelect
            formId="add-word-form"
            name="category"
            categories={formattedCategories}
          />
          <Button type="submit" size="lg" className="bg-green-950 text-base">
            Add word
          </Button>
        </form>
      </div>
    </>
  );
}
