import type { Metadata } from 'next';
import './globals.css';
import Sidebar from './components/Sidebar';

export const metadata: Metadata = {
  title: 'Trading Agent Dashboard',
  description: 'ML trading agent visualization and monitoring platform',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-50 antialiased">
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
          {/* Sidebar - Fixed on left */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto flex flex-col">
            {/* Page Content */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
