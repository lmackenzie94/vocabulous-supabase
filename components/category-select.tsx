'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Category } from '@/types';
import { PlusCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { addCategoryAction } from '@/app/actions';
import { Label } from './ui/label';
interface CategorySelectProps {
  categories: Category[] | null;
  required?: boolean;
  selectedCategoryId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CategorySelect({
  categories,
  selectedCategoryId,
  onChange,
  required = true
}: CategorySelectProps) {
  const [localCategories, setLocalCategories] = useState<Category[]>(
    categories || []
  );
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const newCategoryInputRef = useRef<HTMLInputElement>(null);

  const handleAddCategory = async () => {
    setIsAddingCategory(true);
    setError(null);

    const { category, error } = await addCategoryAction(newCategory);

    if (error) {
      setError(error.message);
      setIsAddingCategory(false);
      return;
    }

    if (category) {
      setShowNewCategory(false);
      setLocalCategories(prev => [...prev, category]);
      onChange({
        target: { name: 'category_id', value: category.id }
      } as React.ChangeEvent<HTMLInputElement>);
      setNewCategory('');
    }
    setIsAddingCategory(false);
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'new') {
      setShowNewCategory(true);
    }

    const selectedCategory = localCategories?.find(
      category => category.id === value
    );
    if (selectedCategory) {
      onChange({
        target: { name: 'category_id', value: selectedCategory.id }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleCancel = () => {
    setShowNewCategory(false);
    setNewCategory('');
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  useEffect(() => {
    if (showNewCategory) {
      newCategoryInputRef.current?.focus();
    }
  }, [showNewCategory]);

  useEffect(() => {
    if (categories) {
      setLocalCategories(categories);
    }
  }, [categories]);

  return (
    <>
      {!showNewCategory ? (
        <div>
          <Label htmlFor="category">
            Category {required && <span className="text-red-500">*</span>}
            <Select
              value={selectedCategoryId ?? ''}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category" className="w-full mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {localCategories?.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                <SelectItem value="new">
                  <span className="flex items-center gap-1 text-indigo-600">
                    <PlusCircle className="h-4 w-4" />
                    Add new category
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </Label>
        </div>
      ) : (
        <div className="flex gap-2 mt-1">
          <Input
            ref={newCategoryInputRef}
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter new category name"
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isAddingCategory}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAddCategory}
            disabled={isAddingCategory}
          >
            {isAddingCategory ? 'Adding...' : 'Add'}
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="hidden"
        name="category_id"
        defaultValue={selectedCategoryId}
      />
    </>
  );
}
