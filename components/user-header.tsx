'use client';

import Link from 'next/link';
import UserAvatar from './user-avatar';
import { cn } from '@/lib/utils';
import { BookText, Plus, Library, Dumbbell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './theme-switcher';
import { User } from '@supabase/supabase-js';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  iconColor: string;
  activeBg: string;
}

const navItems: NavItem[] = [
  {
    path: '/home',
    label: 'Home',
    icon: <BookText className="w-5 h-5" />,
    iconColor: 'text-blue-600',
    activeBg: 'bg-blue-600/5'
  },
  {
    path: '/add',
    label: 'Add Word',
    icon: <Plus className="w-5 h-5" />,
    iconColor: 'text-green-600',
    activeBg: 'bg-green-600/5'
  },
  {
    path: '/words',
    label: 'My Words',
    icon: <Library className="w-5 h-5" />,
    iconColor: 'text-indigo-600',
    activeBg: 'bg-indigo-600/5'
  },
  {
    path: '/practice',
    label: 'Practice',
    icon: <Dumbbell className="w-5 h-5" />,
    iconColor: 'text-red-600',
    activeBg: 'bg-red-600/5'
  }
];

export default function UserHeader({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <div className="relative container mx-auto">
      <nav className="flex justify-center">
        <ul className="flex items-center gap-2 sm:gap-6 justify-center">
          {navItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    'flex flex-col items-center py-2 px-3 rounded-lg font-medium text-sm transition-all focus-ring button-transition',
                    isActive
                      ? `${item.iconColor} ${item.activeBg}`
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {item.icon}
                  <span className="mt-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <UserAvatar user={user} />
      </div>
    </div>
  );
}
