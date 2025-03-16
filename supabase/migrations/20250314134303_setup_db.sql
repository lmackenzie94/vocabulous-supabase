-- Create a table for categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL CHECK (trim(name) <> ''), -- prevent empty strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, name)
);

-- Create a table for words
CREATE TABLE public.words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  word TEXT NOT NULL CHECK (trim(word) <> ''),
  definition TEXT NOT NULL CHECK (trim(definition) <> ''),
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  example TEXT,
  mastery INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, word),
  CONSTRAINT mastery_range CHECK (mastery >= 0 AND mastery <= 100)
);

-- Create a table for user profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL CHECK (trim(first_name) <> ''),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE public.words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for words table
CREATE POLICY "Users can READ their own words" 
  ON public.words FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can INSERT their own words" 
  ON public.words FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can UPDATE their own words" 
  ON public.words FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can DELETE their own words" 
  ON public.words FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for categories table
CREATE POLICY "Users can READ their own categories" 
  ON public.categories FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can INSERT their own categories" 
  ON public.categories FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can UPDATE their own categories" 
  ON public.categories FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can DELETE their own categories" 
  ON public.categories FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for profiles table
CREATE POLICY "Users can READ their own profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profiles
CREATE POLICY "Users can UPDATE their own profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);


-- Function to create default category and profile on user signup
CREATE OR REPLACE FUNCTION public.create_default_category_and_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create default category
  INSERT INTO public.categories (user_id, name)
  VALUES (NEW.id, 'Uncategorized')
  ON CONFLICT DO NOTHING;
  
  -- Create user profile with first_name 
  INSERT INTO public.profiles (id, first_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name')
  ON CONFLICT DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Trigger the function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_default_category_and_profile();

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update the updated_at timestamp
CREATE TRIGGER update_words_updated_at
BEFORE UPDATE ON public.words
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();



