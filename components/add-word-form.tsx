'use client';

import { SubmitButton } from './submit-button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import CategorySelect from './category-select';
import { addWordAction } from '@/app/actions';
import { Category, Word } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type NewWordObject = Pick<
  Word,
  'word' | 'definition' | 'category_id' | 'example'
>;

const initialWordObject: NewWordObject = {
  word: '',
  definition: '',
  category_id: '',
  example: ''
};

export default function AddWordForm({
  categories
}: {
  categories: Category[] | null;
}) {
  const [newWordObject, setNewWordObject] =
    useState<NewWordObject>(initialWordObject);

  const handleSubmit = async (formData: FormData) => {
    const { word, error } = await addWordAction(formData);
    if (!word || error) {
      console.error(error);
      toast.error(error?.message || 'Failed to add word');
      return;
    }
    toast.success(`"${word.word}" has been added to your vocabulary`);
    redirect('/words');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewWordObject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  console.log(newWordObject);

  return (
    <form
      action={handleSubmit}
      className="space-y-6 animate-fade-in bg-card p-4 rounded-lg shadow-md"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="word">
            Word or phrase <span className="text-red-500">*</span>
          </Label>
          <Input
            id="word"
            name="word"
            value={newWordObject.word}
            onChange={handleChange}
            className="mt-1"
            placeholder="Enter a word or phrase"
            autoComplete="off"
            required
          />
        </div>

        <div>
          <Label htmlFor="definition">
            Definition <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="definition"
            name="definition"
            value={newWordObject.definition}
            onChange={handleChange}
            className="mt-1 min-h-24"
            placeholder="What does it mean?"
            required
          />
        </div>

        <CategorySelect
          categories={categories}
          selectedCategoryId={newWordObject.category_id}
          onChange={handleChange}
        />

        <div>
          <Label htmlFor="example">Example sentence (optional)</Label>
          <Textarea
            id="example"
            name="example"
            value={newWordObject.example || ''}
            onChange={handleChange}
            className="mt-1 min-h-24"
            placeholder="Use the word in a sentence"
          />
        </div>
      </div>

      <SubmitButton
        pendingText="Adding..."
        className="w-full bg-green-600 hover:bg-green-700"
      >
        Add to my vocabulary
      </SubmitButton>
    </form>
  );
}
