-- Words for test user 1
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
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Juxtaposition', 'The act of placing two things next to each other for comparison or contrast.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'The juxtaposition of wealth and poverty in the city was striking.', 25, NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Ephemeral', 'Lasting for a very short time.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'The ephemeral nature of fame makes it an unreliable goal.', 40, NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Ubiquitous', 'Present, appearing, or found everywhere.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'Mobile phones have become ubiquitous in modern society.', 65, NOW(), NOW()),
  
  -- Technology words
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'API', 'Application Programming Interface; a set of rules allowing different software applications to communicate with each other.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Technology'), 'The app uses Google Maps API to display location information.', 90, NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Blockchain', 'A digital ledger of transactions that is duplicated and distributed across a network of computer systems.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Technology'), 'Bitcoin uses blockchain technology to record all transactions.', 45, NOW(), NOW()),
  
  -- Business words
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'ROI', 'Return on Investment; a measure of the profitability of an investment.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Business'), 'The marketing campaign delivered an impressive ROI of 250%.', 70, NOW(), NOW()),
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'KPI', 'Key Performance Indicator; a measurable value that demonstrates how effectively a company is achieving key business objectives.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Business'), 'Customer satisfaction is one of our most important KPIs.', 30, NOW(), NOW()),
  
  -- Everyday words
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Ineffable', 'Not able to be expressed in words.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Everyday'), 'The ineffable joy of a newborn child.', 15, NOW(), NOW()),

  -- Uncategorized words
  (gen_random_uuid(), 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Serendipity', 'The occurrence and development of events by chance in a happy or beneficial way.', (SELECT id FROM public.categories WHERE user_id = 'aa2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Uncategorized'), 'Finding that rare book was pure serendipity.', 15, NOW(), NOW());

-- Different words for test user 2
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
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Eloquent', 'Using words effectively and persuasively.', (SELECT id FROM public.categories WHERE user_id = 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'The speaker was eloquent in his speech.', 20, NOW(), NOW()),
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Meticulous', 'Extremely careful and precise.', (SELECT id FROM public.categories WHERE user_id = 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'The meticulous attention to detail in the construction project was remarkable.', 35, NOW(), NOW()),
  
  -- Technology words
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Cybersecurity', 'The practice of protecting networks and systems from attack.', (SELECT id FROM public.categories WHERE user_id = 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Technology'), 'Cybersecurity is a critical concern for modern businesses.', 50, NOW(), NOW()),
  
  -- Science words
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Mitochondria', 'A small organelle found in the cytoplasm of most eukaryotic cells.', (SELECT id FROM public.categories WHERE user_id = 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Science'), 'Mitochondria are often referred to as the "powerhouses of the cell".', 60, NOW(), NOW()),
  
  -- Uncategorized words
  (gen_random_uuid(), 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Serendipity', 'The occurrence and development of events by chance in a happy or beneficial way.', (SELECT id FROM public.categories WHERE user_id = 'bb2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Uncategorized'), 'Finding that rare book was pure serendipity.', 15, NOW(), NOW());

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
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Juxtaposition', 'The act of placing two things next to each other for comparison or contrast.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'The juxtaposition of wealth and poverty in the city was striking.', 25, NOW(), NOW()),
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Ephemeral', 'Lasting for a very short time.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'The ephemeral nature of fame makes it an unreliable goal.', 40, NOW(), NOW()),
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Ubiquitous', 'Present, appearing, or found everywhere.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Academic'), 'Mobile phones have become ubiquitous in modern society.', 65, NOW(), NOW()),
  
  -- Technology words
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'API', 'Application Programming Interface; a set of rules allowing different software applications to communicate with each other.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Technology'), 'The app uses Google Maps API to display location information.', 90, NOW(), NOW()),
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Blockchain', 'A digital ledger of transactions that is duplicated and distributed across a network of computer systems.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Technology'), 'Bitcoin uses blockchain technology to record all transactions.', 45, NOW(), NOW()),
  
  -- Business words
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'ROI', 'Return on Investment; a measure of the profitability of an investment.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Business'), 'The marketing campaign delivered an impressive ROI of 250%.', 70, NOW(), NOW()),
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'KPI', 'Key Performance Indicator; a measurable value that demonstrates how effectively a company is achieving key business objectives.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Business'), 'Customer satisfaction is one of our most important KPIs.', 30, NOW(), NOW()),
  
  -- Everyday words
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Ineffable', 'Not able to be expressed in words.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Everyday'), 'The ineffable joy of a newborn child.', 15, NOW(), NOW()),

  -- Uncategorized words
  (gen_random_uuid(), 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e', 'Serendipity', 'The occurrence and development of events by chance in a happy or beneficial way.', (SELECT id FROM public.categories WHERE user_id = 'cc2adfc7-0110-4f71-803f-08cc2f18ea8e' AND name = 'Uncategorized'), 'Finding that rare book was pure serendipity.', 15, NOW(), NOW());