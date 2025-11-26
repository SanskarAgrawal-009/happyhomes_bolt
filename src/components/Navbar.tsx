import { Link, useNavigate } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

export default function Navbar({ isAuthenticated = false, onSignOut }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
    navigate('/');
  };

  return (
    <nav className="bg-luxury-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <Home className="w-8 h-8 text-gray-800 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-serif font-bold text-gray-800 tracking-tight">Happy Homes</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide relative group">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-white group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-800 hover:text-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-luxury-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              className="block py-3 text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-3 text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-3 text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-3 text-gray-800 hover:text-gray-800 transition-colors font-medium tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
