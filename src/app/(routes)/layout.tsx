import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

import Providers from './providers';
import Header from '../components/layout/header/Header';
import { AuthProvider } from '../_contexts/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-gray-100" lang="en">
      <body className="h-full flex flex-col bg-gray-100">
        <Providers>
          <AuthProvider>
            <Header />
            <div className="pt-32 container mx-auto p-4">{children}</div>
            <ToastContainer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
