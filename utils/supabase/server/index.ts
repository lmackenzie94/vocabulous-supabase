import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SUPABASE_CONFIG } from '../env-vars';
import { Database } from '@/types/db';

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    SUPABASE_CONFIG.url!,
    SUPABASE_CONFIG.anonKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  );
};
