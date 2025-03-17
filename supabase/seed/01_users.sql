-- User 1: test1@test.com
-- Password: password
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
  'aa2adfc7-0110-4f71-803f-08cc2f18ea8e',                    -- id
  'authenticated',                                            -- aud
  'authenticated',                                            -- role
  'test1@test.com',                               -- email
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
  '{"email_verified": true, "first_name": "Test1"}',          -- raw_user_meta_data
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

-- User 2: test2@test.com
-- Password: password
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
  'bb2adfc7-0110-4f71-803f-08cc2f18ea8e',                    -- id
  'authenticated',                                            -- aud
  'authenticated',                                            -- role
  'test2@test.com',                               -- email
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
  '{"email_verified": true, "first_name": "Test2"}',          -- raw_user_meta_data
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

-- User 3: demo@example.com 
-- Password: password
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
  'cc2adfc7-0110-4f71-803f-08cc2f18ea8e',                    -- id
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