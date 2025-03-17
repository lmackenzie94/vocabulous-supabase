// import { SupabaseClient, User } from '@supabase/supabase-js';
// import { createClient } from '.';
// import { redirect } from 'next/navigation';
// import { Category, Word, WordWithCategory } from '@/types';

// /**
//  * Gets the current authentication state without enforcing authentication
//  * @returns The user (or null) and supabase client
//  */
// export async function getAuth(): Promise<{
//   user: User | null;
//   supabase: SupabaseClient;
// }> {
//   const supabase = createClient();

//   const {
//     data: { user }
//   } = await supabase.auth.getUser();

//   return { user, supabase };
// }

// /**
//  * Gets the current authentication state and enforces authentication
//  * @param redirectUrl Optional URL to redirect to if not authenticated (defaults to /sign-in)
//  * @returns The authenticated user and supabase client
//  */
// export async function requireAuth(redirectUrl = '/sign-in'): Promise<{
//   user: User;
//   supabase: SupabaseClient;
// }> {
//   const { user, supabase } = await getAuth();

//   if (!user) {
//     redirect(redirectUrl);
//   }

//   return { user, supabase };
// }

// /**
//  * Checks if the user is authenticated without redirecting
//  * @returns True if authenticated, false otherwise
//  */
// export async function isAuthenticated(): Promise<boolean> {
//   const { user } = await getAuth();
//   return user !== null;
// }

// // NOTE: don't need to specify user_id because the RLS policy only allows access to the user's own words
// export async function getUserWords(): Promise<{
//   words: WordWithCategory[] | null;
//   error: Error | null;
// }> {
//   const { supabase } = await getAuth();

//   const { data: words, error } = await supabase
//     .from('words')
//     .select(
//       `
//     *,
//     category: category_id (
//       name
//     )
//   `
//     )
//     .order('created_at', { ascending: false });

//   if (error) {
//     console.error(error);
//     return { words: null, error };
//   }

//   return { words, error: null };
// }

// export async function getUserWordById(id: string): Promise<{
//   word: WordWithCategory | null;
//   error: Error | null;
// }> {
//   const { supabase } = await getAuth();

//   const { data: word, error } = await supabase
//     .from('words')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error) {
//     console.error(error);
//     return { word: null, error };
//   }

//   return { word, error: null };
// }

// // NOTE: don't need to specify user_id because the RLS policy only allows access to the user's own categories
// export async function getUserCategories(): Promise<{
//   categories: Category[] | null;
//   error: Error | null;
// }> {
//   const { supabase } = await getAuth();

//   const { data: categories, error } = await supabase
//     .from('categories')
//     .select('*');

//   if (error) {
//     console.error('Error fetching categories:', error);
//     return { categories: null, error };
//   }

//   return { categories, error: null };
// }
