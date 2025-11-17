import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Navbar from './components/Navbar';


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
      <body className="bg-dark text-light">
        <div className="flex h-screen bg-dark">
          {/* Sidebar */}
          <Sidebar />
                      <Navbar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header />
            
            {/* Main Area */}
            <main className="flex-1 overflow-auto bg-gray-900 px-6 py-4">
              {children}
            </main>
          </div>
                    <Footer />
        </div>
      </body>
    </html>
  );
}
