'use client';

import { useState, useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { signOutAction } from '@/app/actions';
import { User } from '@supabase/supabase-js';
import { ThemeSwitcher } from './theme-switcher';

const BG_COLOUR = 'bg-blue-500';
const TEXT_COLOUR = 'text-white';

export default function UserAvatar({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get first initial from name
  const { first_name } = user.user_metadata;
  const initial = first_name.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('clicked outside');
      console.log('target', event.target);
      console.log('dropdownRef', dropdownRef.current);
      console.log(
        'contains',
        !dropdownRef.current?.contains(event.target as Node)
      );
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center font-medium text-lg',
              'transition-all duration-300 hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-primary/20',
              BG_COLOUR,
              TEXT_COLOUR
            )}
            onMouseEnter={() => setIsOpen(true)}
          >
            {initial}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" ref={dropdownRef}>
          <div className="flex items-center p-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center mr-2',
                BG_COLOUR,
                TEXT_COLOUR
              )}
            >
              {initial}
            </div>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">{first_name}</p>
              {user.email && (
                <p className="text-xs text-muted-foreground">{user.email}</p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <ThemeSwitcher />
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={signOutAction}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
