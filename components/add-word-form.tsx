'use client';

import { SubmitButton } from './submit-button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import CategorySelect from './category-select';
import { addWordAction } from '@/app/actions';
import { Category } from '@/types';

const FORM_ID = 'add-word-form';
export default function AddWordForm({
  categories
}: {
  categories: Category[] | null;
}) {
  return (
    <form
      id={FORM_ID}
      action={addWordAction}
      className="space-y-6 animate-fade-in"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="word">
            Word or phrase <span className="text-red-500">*</span>
          </Label>
          <Input
            id="word"
            name="word"
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
            className="mt-1 min-h-24"
            placeholder="What does it mean?"
            required
          />
        </div>

        <CategorySelect
          name="category_id"
          categories={categories}
          formId="add-word-form"
        />

        <div>
          <Label htmlFor="example">Example sentence (optional)</Label>
          <Textarea
            id="example"
            name="example"
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
