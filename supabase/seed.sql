
-- TODO: Create a user

-- Seed categories
INSERT INTO categories (user_id, name) VALUES (NULL, 'Test Category');

-- Seed words
INSERT INTO words (user_id, word, definition, example_sentence, category) VALUES (NULL, 'Test Word', 'Test Definition', 'Test Example Sentence', 1);
INSERT INTO words (user_id, word, definition, example_sentence, category) VALUES (NULL, 'Test Word 2', 'Test Definition 2', 'Test Example Sentence 2', 1);
