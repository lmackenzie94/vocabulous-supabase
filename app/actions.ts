'use server';

import { encodedRedirect } from '@/lib/utils';
import { Category, Word } from '@/types';
import { requireAuth } from '@/utils/supabase/server/queries';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isDemoUser } from '@/utils/supabase';

const DEMO_USER_ERROR_MESSAGE = "Sorry, you can look but you can't touch! 🙅🏻‍♂️";

// AUTH ACTIONS
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

export const signInAsDemoUserAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: 'demo@example.com',
    password: 'password'
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

// WORD ACTIONS
type CustomError = {
  message: string | null;
};

export const addWordAction = async (
  formData: FormData
): Promise<{ word: Word | null; error: CustomError | null }> => {
  const { supabase, user } = await requireAuth();

  if (isDemoUser(user)) {
    return {
      word: null,
      error: {
        message: DEMO_USER_ERROR_MESSAGE
      }
    };
  }

  const { word, definition, example, category_id } =
    Object.fromEntries(formData);

  const { data: newWord, error } = await supabase
    .from('words')
    .insert({
      word: word as string,
      definition: definition as string,
      example: example as string,
      category_id: category_id as string,
      user_id: user.id
    })
    .select();

  if (!newWord || error) {
    console.error(error);

    return {
      word: null,
      error: {
        message: error.message
      }
    };
  }

  revalidatePath('/words');

  return {
    word: newWord[0],
    error: null
  };
};

export const editWordAction = async (
  wordId: string,
  formData: FormData
): Promise<{ word: Word | null; error: CustomError | null }> => {
  const { supabase, user } = await requireAuth();

  if (isDemoUser(user)) {
    return {
      word: null,
      error: {
        message: DEMO_USER_ERROR_MESSAGE
      }
    };
  }

  const { word, definition, example, category_id } =
    Object.fromEntries(formData);

  const { data: updatedWord, error } = await supabase
    .from('words')
    .update({
      word: word as string,
      definition: definition as string,
      example: example as string,
      category_id: category_id as string
    })
    .eq('id', wordId)
    .select();

  if (!updatedWord || error) {
    console.error(error);
    return {
      word: null,
      error: {
        message: error.message
      }
    };
  }

  revalidatePath('/words');

  return {
    word: updatedWord[0],
    error: null
  };
};

export const addCategoryAction = async (
  name: string
): Promise<{ category: Category | null; error: CustomError | null }> => {
  const { supabase, user } = await requireAuth();

  if (isDemoUser(user)) {
    return {
      category: null,
      error: {
        message: DEMO_USER_ERROR_MESSAGE
      }
    };
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
      error: {
        message: error.message
      }
    };
  }

  return {
    category: category[0],
    error: null
  };
};

export const deleteWordAction = async (
  wordId: string
): Promise<{ word: Word | null; error: CustomError | null }> => {
  const { supabase, user } = await requireAuth();

  if (isDemoUser(user)) {
    return {
      word: null,
      error: {
        message: DEMO_USER_ERROR_MESSAGE
      }
    };
  }

  const { data: word, error } = await supabase
    .from('words')
    .delete()
    .eq('id', wordId)
    .select();

  if (!word || error) {
    console.error(error);
    return {
      word: null,
      error: {
        message: error.message
      }
    };
  }

  revalidatePath('/words');

  return {
    word: word[0],
    error: null
  };
};
