import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Home,
  LayoutDashboard,
  User,
  MessageSquare,
  Briefcase,
  FileText,
  Upload,
  Users,
  LogOut,
} from 'lucide-react';
import type { RootState } from '../store';
import { clearUser } from '../store/slices/userSlice';

export default function DashboardLayout() {
  const { role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(clearUser());
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const homeownerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/my-requirements', icon: FileText, label: 'My Requirements' },
    { to: '/dashboard/browse-designers', icon: Users, label: 'Browse Designers' },
    { to: '/dashboard/post-requirement', icon: Briefcase, label: 'Post Requirement' },
    { to: '/dashboard/chat', icon: MessageSquare, label: 'Messages' },
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  const designerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/browse-requirements', icon: Briefcase, label: 'Browse Requirements' },
    { to: '/dashboard/my-proposals', icon: FileText, label: 'My Proposals' },
    { to: '/dashboard/portfolio', icon: Upload, label: 'Portfolio' },
    { to: '/dashboard/chat', icon: MessageSquare, label: 'Messages' },
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  const freelancerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/browse-jobs', icon: Briefcase, label: 'Browse Jobs' },
    { to: '/dashboard/my-applications', icon: FileText, label: 'My Applications' },
    { to: '/dashboard/chat', icon: MessageSquare, label: 'Messages' },
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  const links =
    role === 'designer'
      ? designerLinks
      : role === 'freelancer'
        ? freelancerLinks
        : homeownerLinks;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-8 h-8 text-pastel-purple" />
              <span className="text-2xl font-bold text-gray-900">Happy Homes</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-700 hover:text-pastel-purple transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
              <nav className="space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-pastel-purple rounded-lg transition-colors font-medium"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
