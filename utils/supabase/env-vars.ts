export const SUPABASE_CONFIG = {
  url:
    process.env.APP_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : process.env.NEXT_PUBLIC_SUPABASE_URL_DEV,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
};
