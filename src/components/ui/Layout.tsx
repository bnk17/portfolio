import type { ReactNode } from 'react';
import { Navbar } from '../Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-9xl mx-auto min-h-screen bg-transparent px-6">
      <Navbar />
      {children}
      <footer className="p-5 text-center font-mono text-[11px] font-medium tracking-widest text-zinc-600 uppercase">
        © 2026. Made by{' '}
        <a
          href="https://www.linkedin.com/in/borisnkuako"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600"
        >
          Boris N'Kuako
        </a>
      </footer>
    </main>
  );
}
