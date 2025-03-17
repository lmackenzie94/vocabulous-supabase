import { signInAction, signInAsDemoUserAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-indigo-600/10 mb-4">
          <BookMarked className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="mt-2 text-muted-foreground">Welcome back to Vocabulous</p>
      </div>

      <form className="space-y-6 animate-fade-in bg-card p-6 rounded-lg shadow-md">
        <div className="space-y-4">
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
            <div className="flex justify-between items-center">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              className="mt-1"
              required
            />
            <Link
              className="text-xs text-indigo-600 hover:text-indigo-700 text-right block mt-1"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div>
          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Sign In
          </SubmitButton>

          <p className="text-xs text-muted-foreground mt-4">
            Or try the app without creating an account
          </p>
          <Button
            type="button"
            onClick={signInAsDemoUserAction}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 mt-1"
          >
            Sign In as Demo User
          </Button>
        </div>
        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              className="text-indigo-600 hover:text-indigo-700 font-medium"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
      <FormMessage message={searchParams} />
    </div>
  );
}
