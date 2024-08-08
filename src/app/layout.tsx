import './globals.css';
import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import AdminPortalAppBar from '../components/AdminPortalAppBar';
import { CssBaseline } from '@mui/material';

const sourceCodeProFont = Source_Code_Pro({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Portal',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceCodeProFont.className}>
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <AdminPortalAppBar />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
