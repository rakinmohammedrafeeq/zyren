import { Outlet, useLocation } from 'react-router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function AppLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === '/reset-password';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
