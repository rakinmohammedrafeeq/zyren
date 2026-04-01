import { Outlet, useLocation } from 'react-router';
import { FullNavbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === '/reset-password';

  return (
    <div className="min-h-screen flex flex-col">
      <FullNavbar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

