import { forgotPasswordAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { SmtpMessage } from '../smtp-message';
import { KeyRound } from 'lucide-react';

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-w-80 mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-red-600/10 mb-4">
          <KeyRound className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="mt-2 text-muted-foreground">
          We'll send you a link to reset your password
        </p>
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
        </div>

        <SubmitButton
          formAction={forgotPasswordAction}
          pendingText="Sending..."
          className="w-full bg-red-600 hover:bg-red-700"
        >
          Reset Password
        </SubmitButton>

        <FormMessage message={searchParams} />

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link
              className="text-red-600 hover:text-red-700 font-medium"
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
