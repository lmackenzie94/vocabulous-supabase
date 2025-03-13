'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { addCategoryAction } from '@/app/actions';

type Category = {
  value: string;
  label: string;
};

export function CategorySelect({
  name,
  categories,
  formId
}: {
  name: string;
  categories: Category[] | undefined;
  formId: string;
}) {
  const [open, setOpen] = useState(false);
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [value, setValue] = useState(''); // category id
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [availableCategories, setAvailableCategories] = useState(
    categories || []
  );

  useEffect(() => {
    const handleSubmit = () => {
      // Clear the value after successful form submission
      setTimeout(() => {
        setValue('');
      }, 0);
    };

    const form = document.getElementById(formId);
    form?.addEventListener('submit', handleSubmit);

    return () => {
      form?.removeEventListener('submit', handleSubmit);
    };
  }, []);

  const handleCreateCategory = async () => {
    setIsCreatingCategory(true);
    const newCategory = await addCategoryAction(newCategoryName);

    if (newCategory) {
      const newCategoryFormatted = {
        value: newCategory[0].id,
        label: newCategory[0].name
      };
      setAvailableCategories(prev => [...prev, newCategoryFormatted]);
      setValue(newCategory[0].id);
      setNewCategoryName('');
      setShowNewCategoryDialog(false);
    }
    setIsCreatingCategory(false);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      {/* hidden input for the category id */}
      <input type="hidden" name={name} value={value} />

      <Label htmlFor={name}>Category</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {value
              ? availableCategories.find(category => category.value === value)
                  ?.label
              : 'Select category...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {availableCategories.map(category => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === category.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <Dialog
                  open={showNewCategoryDialog}
                  onOpenChange={open => {
                    setShowNewCategoryDialog(open);
                    // When dialog closes, ensure popover is also closed
                    if (!open) {
                      setOpen(false);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        // Instead of trying to prevent default, we'll directly handle the dialog
                        setShowNewCategoryDialog(true);
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create new category
                    </CommandItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create new category</DialogTitle>
                      <DialogDescription>
                        Add a new category to your collection.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newCategoryName}
                          onChange={e => setNewCategoryName(e.target.value)}
                          className="col-span-3"
                          autoFocus
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowNewCategoryDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateCategory}
                        disabled={isCreatingCategory}
                      >
                        {isCreatingCategory ? 'Creating...' : 'Create'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
