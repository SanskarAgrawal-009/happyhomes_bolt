import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';
import type { RootState } from '../store';
import { clearUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(clearUser());
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
