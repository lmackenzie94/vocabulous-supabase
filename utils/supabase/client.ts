import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/database.types';
import { SUPABASE_CONFIG } from './env-vars';

export const createClient = () =>
  createBrowserClient<Database>(SUPABASE_CONFIG.url!, SUPABASE_CONFIG.anonKey!);
