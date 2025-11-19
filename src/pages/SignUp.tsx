import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useDispatch } from 'react-redux';
import { setUserRole, setAuthenticated } from '../store/slices/userSlice';
import type { UserRole } from '../store/slices/userSlice';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('homeowner');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roleOptions = [
    { value: 'homeowner', label: 'Homeowner' },
    { value: 'designer', label: 'Interior Designer' },
    { value: 'freelancer', label: 'Freelancer' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem('userRole', role as string);
    dispatch(setUserRole(role));
    dispatch(setAuthenticated(true));

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Home className="w-10 h-10 text-[#BE3144]" />
            <span className="text-3xl font-bold text-gray-900">Happy Homes</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join our community of professionals and homeowners</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Select
              label="I am a"
              options={roleOptions}
              value={role as string}
              onChange={(e) => setRole(e.target.value as UserRole)}
              required
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#BE3144] border-gray-300 rounded focus:ring-[#BE3144] mt-1"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-[#BE3144] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#BE3144] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#BE3144] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Choose Your Role:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#BE3144] font-bold">•</span>
              <span><strong>Homeowner:</strong> Post projects and hire designers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#BE3144] font-bold">•</span>
              <span><strong>Interior Designer:</strong> Showcase portfolio and manage projects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#BE3144] font-bold">•</span>
              <span><strong>Freelancer:</strong> Find jobs and offer specialized services</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
