import { signUpAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { SmtpMessage } from '../smtp-message';
import { BookMarked } from 'lucide-react';

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ('message' in searchParams) {
    return (
      <div className="max-w-md mx-auto animate-fade-in bg-card p-6 rounded-lg shadow-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-green-600/10 mb-4">
          <BookMarked className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="mt-2 text-muted-foreground">
          Create your Vocabulous account
        </p>
      </div>

      <form className="space-y-6 animate-fade-in bg-card p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <Label htmlFor="first_name">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="first_name"
              name="first_name"
              placeholder="Your first name"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              className="mt-1"
              minLength={6}
              required
            />
          </div>
        </div>

        <SubmitButton
          formAction={signUpAction}
          pendingText="Signing up..."
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Sign Up
        </SubmitButton>

        <FormMessage message={searchParams} />

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              className="text-green-600 hover:text-green-700 font-medium"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>

      {/* <SmtpMessage /> */}
    </div>
  );
}
