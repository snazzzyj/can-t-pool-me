import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: "Can't Pool Me - Birthday Game",
  description: 'An interactive birthday game with visual novel and mini-games',
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
