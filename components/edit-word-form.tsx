'use client';

import { SubmitButton } from './submit-button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import CategorySelect from './category-select';
import { addWordAction, editWordAction } from '@/app/actions';
import { Category, WordWithCategory } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export default function EditWordForm({
  categories,
  word: wordObject
}: {
  categories: Category[] | null;
  word: WordWithCategory;
}) {
  const [updatedWordObject, setUpdatedWordObject] = useState(wordObject);

  const handleSubmit = async (formData: FormData) => {
    const { word, error } = await editWordAction(wordObject.id, formData);
    if (!word || error) {
      console.error(error);
      toast.error(error?.message || 'Failed to edit word');
      return;
    }
    toast.success(`"${word.word}" has been updated`);
    redirect('/words');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUpdatedWordObject(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            value={updatedWordObject.word}
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
            value={updatedWordObject.definition}
            onChange={handleChange}
            className="mt-1 min-h-24"
            placeholder="What does it mean?"
            required
          />
        </div>

        <CategorySelect
          categories={categories}
          selectedCategoryId={updatedWordObject.category_id}
          onChange={handleChange}
        />

        <div>
          <Label htmlFor="example">Example sentence (optional)</Label>
          <Textarea
            id="example"
            name="example"
            value={updatedWordObject.example || ''}
            onChange={handleChange}
            className="mt-1 min-h-24"
            placeholder="Use the word in a sentence"
          />
        </div>
      </div>

      <SubmitButton
        pendingText="Editing..."
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        Edit word
      </SubmitButton>
    </form>
  );
}
