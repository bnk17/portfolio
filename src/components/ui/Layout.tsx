import type { ReactNode } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import { Navbar } from '../Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-9xl mx-auto min-h-screen bg-white px-6 pt-24">
      <Navbar />
      {children}
    </main>
  );
}
