"use client";

import '../styles/globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Documentation Feedback System</title>
      </head>
      <body>
        <SessionProvider>
          <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
              <li><Link href="/" className="text-white">Home</Link></li>
              <li><Link href="/snippets" className="text-white">Saved Snippets</Link></li>
            </ul>
          </nav>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;