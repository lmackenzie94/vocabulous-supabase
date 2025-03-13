import HeaderAuth from '@/components/header-auth';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './globals.css';

const TITLE = 'Vocabulous';
const DESCRIPTION = 'For a fab vocab.';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: TITLE,
  description: DESCRIPTION
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full flex justify-center border-b border-b-foreground/10 mb-12 bg-background">
            <div className="w-full max-w-5xl flex justify-between items-center py-2 text-sm">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold">
                  <Link href={'/'}>{TITLE}</Link>
                </h1>
                <p className="text-xs text-muted-foreground">{DESCRIPTION}</p>
              </div>
              <HeaderAuth />
            </div>
          </nav>
          <main className="container">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
