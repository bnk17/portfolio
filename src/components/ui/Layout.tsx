import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-9xl mx-auto min-h-screen bg-white px-6 pt-24">
      {children}
    </main>
  );
}
