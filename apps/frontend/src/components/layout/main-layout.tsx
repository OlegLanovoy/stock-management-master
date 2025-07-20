import type { ReactNode } from 'react';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
}
