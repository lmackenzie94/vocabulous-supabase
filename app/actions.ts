'use server';

import { encodedRedirect } from '@/lib/utils';
import { Category } from '@/types';
import { requireAuth } from '@/utils/supabase/server/queries';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required'
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: formData.get('first_name')
      }
    }
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/home');
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/home/reset-password`
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/home/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', '/home/reset-password', 'Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    encodedRedirect('error', '/home/reset-password', 'Password update failed');
  }

  encodedRedirect('success', '/home/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/sign-in');
};

export const addWordAction = async (formData: FormData): Promise<void> => {
  const { supabase, user } = await requireAuth();

  const { word, definition, example, category_id } =
    Object.fromEntries(formData);

  const { data, error } = await supabase
    .from('words')
    .insert({
      word: word as string,
      definition: definition as string,
      example: example as string,
      category_id: category_id as string,
      user_id: user.id
    })
    .select();

  if (error) {
    console.error(error);
  }

  console.log('WORD ADDED', data);
  // return data;
};

export const addCategoryAction = async (
  name: string
): Promise<{ category: Category | null; error: PostgrestError | null }> => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const { data: category, error } = await supabase
    .from('categories')
    .insert({
      name: name.trim(),
      user_id: user.id
    })
    .select();

  if (!category || error) {
    console.error(error);
    return {
      category: null,
      error: error
    };
  }

  console.log('CATEGORY ADDED', category);

  return {
    category: category[0],
    error: null
  };
};

export const deleteWordAction = async (formData: FormData) => {
  const { supabase } = await requireAuth();

  const { word_id } = Object.fromEntries(formData);

  const { error } = await supabase.from('words').delete().eq('id', word_id);

  if (error) {
    console.error(error);
  }

  revalidatePath('/words');
};
