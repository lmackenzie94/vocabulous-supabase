-- Function to check if the user is a demo user
CREATE OR REPLACE FUNCTION public.is_demo_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.email() = 'demo@example.com';
END;
$$ LANGUAGE plpgsql;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can INSERT their own words" ON public.words;
DROP POLICY IF EXISTS "Users can UPDATE their own words" ON public.words;
DROP POLICY IF EXISTS "Users can DELETE their own words" ON public.words;
DROP POLICY IF EXISTS "Users can INSERT their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can UPDATE their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can DELETE their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can UPDATE their own profiles" ON public.profiles;

-- Create new policies
CREATE POLICY "Users can INSERT their own words" 
  ON public.words FOR INSERT 
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY "Users can UPDATE their own words" 
  ON public.words FOR UPDATE 
  USING (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY "Users can DELETE their own words" 
  ON public.words FOR DELETE 
  USING (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY "Users can INSERT their own categories" 
  ON public.categories FOR INSERT 
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY "Users can UPDATE their own categories" 
  ON public.categories FOR UPDATE 
  USING (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY "Users can DELETE their own categories" 
  ON public.categories FOR DELETE 
  USING (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY "Users can UPDATE their own profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id AND NOT public.is_demo_user());