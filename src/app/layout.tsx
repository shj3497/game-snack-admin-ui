import type {Metadata} from 'next';
import QueryClientProvider from '@/components/providers/QueryClientProvider.client';
import ThemeProvider from '@/components/providers/MuiProvider.server';
import LocalizationProvider from '@/components/providers/LocalizationProvider.client';
import classNames from 'classnames';
import {fonts} from '@/lib/theme';
import {NuqsAdapter} from 'nuqs/adapters/next/app';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import SnackbarProvider from '@/components/providers/SnackbarProvider.client';

export const metadata: Metadata = {
  title: 'Game Snack Admin',
  description: '게임 스낵 관리자 페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={classNames(fonts.roboto.variable)}>
      <body>
        <SnackbarProvider>
          <NuqsAdapter>
            <ThemeProvider>
              <NextTopLoader showSpinner={false} height={4} />
              <LocalizationProvider>
                <QueryClientProvider>{children}</QueryClientProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </SnackbarProvider>
      </body>
    </html>
  );
}
