import { Link } from 'react-router-dom';
import { Home, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-white border-t border-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <Home className="w-8 h-8 text-gray-800 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-serif font-bold text-gray-800">Happy Homes</span>
            </Link>
            <p className="text-gray-800 leading-relaxed mb-6 max-w-md">
              Your premium platform for connecting with elite interior designers and verified freelancers.
              Transform your space with confidence and luxury.
            </p>
            <div className="h-px w-24 bg-gray-800"></div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-800 hover:text-gray-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-800 hover:text-gray-800 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-800 hover:text-gray-800 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-800 hover:text-gray-800 transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-gray-800">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-800 mt-0.5" />
                <span className="text-gray-800">info@happyhomes.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-800 mt-0.5" />
                <span className="text-gray-800">+91 1234567890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-800 mt-0.5" />
                <span className="text-gray-800">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center">
          <p className="text-luxury-white-soft text-sm">
            &copy; {new Date().getFullYear()} Happy Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
