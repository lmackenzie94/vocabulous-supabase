import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_CONFIG } from '../env-vars';
import { Database } from '@/types/db';

export const createClient = () =>
  createBrowserClient<Database>(SUPABASE_CONFIG.url!, SUPABASE_CONFIG.anonKey!);
