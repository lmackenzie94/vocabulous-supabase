Created via `npx create-next-app -e with-supabase`

Pulled remote Supabase database schema via `supabase db pull`
Added `supabase/seed.sql` to seed the local database with data
Ran `supabase db reset` to reset the local database to match the remote database

## To do

- [ ] Add constraints to the database (user can't add same word or category twice)
- [ ] Add Google auth
