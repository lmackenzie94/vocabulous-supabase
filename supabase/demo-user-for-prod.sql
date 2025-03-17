-- Create a demo user for production
-- Tried adding one manually via the Dashboard, but was getting an error (I think because I can't add a "first_name" value and it's a required field)
-- TO APPLY: go to SQL Editor in Supabase, and run the query below.

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at,
  is_anonymous
) VALUES (
  '00000000-0000-0000-0000-000000000000',                    -- instance_id
  '00000000-0000-0000-0000-000000000000',                    -- id
  'authenticated',                                            -- aud
  'authenticated',                                            -- role
  'demo@example.com',                               -- email
  '$2a$10$Hw6xG47rHlXo5Q.tdwyD4ur4LaVKMLgKOJmpzKNWNIuoV/KWl9t/i', -- encrypted_password
  NOW(),                                                      -- email_confirmed_at
  null,                                                       -- invited_at
  '',                                                         -- confirmation_token
  null,                                                       -- confirmation_sent_at
  '',                                                         -- recovery_token
  null,                                                       -- recovery_sent_at
  '',                                                         -- email_change_token_new
  '',                                                         -- email_change
  null,                                                       -- email_change_sent_at
  NOW(),                                                      -- last_sign_in_at
  '{"provider": "email", "providers": ["email"]}',            -- raw_app_meta_data
  '{"email_verified": true, "first_name": "Demo McAwesome"}',          -- raw_user_meta_data
  null,                                                       -- is_super_admin
  NOW(),                                                      -- created_at
  NOW(),                                                      -- updated_at
  null,                                                       -- phone
  null,                                                       -- phone_confirmed_at
  '',                                                         -- phone_change
  '',                                                         -- phone_change_token
  null,                                                       -- phone_change_sent_at
  '',                                                         -- email_change_token_current
  '0',                                                        -- email_change_confirm_status
  null,                                                       -- banned_until
  '',                                                         -- reauthentication_token
  null,                                                       -- reauthentication_sent_at
  'false',                                                    -- is_sso_user
  null,                                                       -- deleted_at
  'false'                                                     -- is_anonymous
);

-- Categories for demo user
INSERT INTO public.categories (id, user_id, name, created_at, updated_at)
VALUES 
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Uncategorized', NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Academic', NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Technology', NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Business', NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Everyday', NOW(), NOW())
ON CONFLICT (user_id, name) DO NOTHING;

-- Words for demo user
INSERT INTO public.words (
  id, 
  user_id, 
  word, 
  definition, 
  category_id, 
  example, 
  mastery,
  created_at,
  updated_at
)
VALUES
  -- Academic words
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Juxtaposition', 'The act of placing two things next to each other for comparison or contrast.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Academic'), 'The juxtaposition of wealth and poverty in the city was striking.', 25, NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Ephemeral', 'Lasting for a very short time.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Academic'), 'The ephemeral nature of fame makes it an unreliable goal.', 40, NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Ubiquitous', 'Present, appearing, or found everywhere.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Academic'), 'Mobile phones have become ubiquitous in modern society.', 65, NOW(), NOW()),
  
  -- Technology words
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'API', 'Application Programming Interface; a set of rules allowing different software applications to communicate with each other.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Technology'), 'The app uses Google Maps API to display location information.', 90, NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Blockchain', 'A digital ledger of transactions that is duplicated and distributed across a network of computer systems.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Technology'), 'Bitcoin uses blockchain technology to record all transactions.', 45, NOW(), NOW()),
  
  -- Business words
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'ROI', 'Return on Investment; a measure of the profitability of an investment.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Business'), 'The marketing campaign delivered an impressive ROI of 250%.', 70, NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'KPI', 'Key Performance Indicator; a measurable value that demonstrates how effectively a company is achieving key business objectives.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Business'), 'Customer satisfaction is one of our most important KPIs.', 30, NOW(), NOW()),
  
  -- Everyday words
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Ineffable', 'Not able to be expressed in words.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Everyday'), 'The ineffable joy of a newborn child.', 15, NOW(), NOW()),

  -- Uncategorized words
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'Serendipity', 'The occurrence and development of events by chance in a happy or beneficial way.', (SELECT id FROM public.categories WHERE user_id = '00000000-0000-0000-0000-000000000000' AND name = 'Uncategorized'), 'Finding that rare book was pure serendipity.', 15, NOW(), NOW());