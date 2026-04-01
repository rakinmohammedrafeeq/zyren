import { Outlet } from 'react-router';
import { MinimalNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <MinimalNavbar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

