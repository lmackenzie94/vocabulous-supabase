import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';

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
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Header />
          <main className="container py-36">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
