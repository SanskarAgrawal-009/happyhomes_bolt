import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { RootState } from '../store';
import { useAuth } from '../hooks/useAuth';
import PageTransition from './PageTransition';

export default function Layout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
