-- Categories for test user 1
INSERT INTO public.categories (id, user_id, name, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Uncategorized', NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Academic', NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Technology', NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Business', NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Everyday', NOW(), NOW())
ON CONFLICT (user_id, name) DO NOTHING;

-- Categories for test user 2
INSERT INTO public.categories (id, user_id, name, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Uncategorized', NOW(), NOW()),
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Academic', NOW(), NOW()),
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Technology', NOW(), NOW()),
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Science', NOW(), NOW())
ON CONFLICT (user_id, name) DO NOTHING;