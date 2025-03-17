import { User } from '@supabase/supabase-js';

export const isDemoUser = (user: User) => {
  return user.email === 'demo@example.com';
};
