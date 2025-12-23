import LoginForm from '@/components/auth/LoginForm';
import { Logo } from '@/components/icons/Logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-block">
            <Logo />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl font-headline">
            Admin Portal Sign-In
          </h2>
          <p className="mt-2 text-muted-foreground">
            Access the IPL Auction Command Center
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
