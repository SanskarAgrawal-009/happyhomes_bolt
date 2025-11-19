import { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, MapPin, Phone, Save } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Card from '../../components/ui/Card';
import type { RootState } from '../../store';

export default function Profile() {
  const { role } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Mumbai, India');
  const [bio, setBio] = useState('Passionate about creating beautiful spaces.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6 lg:col-span-1 h-fit">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <Button variant="outline" size="sm" className="w-full mb-4">
              Change Photo
            </Button>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{name}</h2>
            <p className="text-sm text-gray-600 mb-4 capitalize">{role}</p>
            <div className="space-y-2 text-sm text-gray-600 text-left">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="tel"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <TextArea
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
            />

            {role === 'freelancer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Carpentry', 'Painting', 'Electrical'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill} ×
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" type="button">
                  Add Skill
                </Button>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary">
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {role === 'designer' && (
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Specialty" placeholder="e.g., Modern & Contemporary" />
            <Input label="Hourly Rate" placeholder="e.g., $80/hr" />
            <Input label="Years of Experience" type="number" placeholder="e.g., 8" />
            <Input label="Completed Projects" type="number" placeholder="e.g., 32" />
          </div>
        </Card>
      )}

      {role === 'freelancer' && (
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Aadhaar Verified</p>
                  <p className="text-sm text-gray-600">Your identity has been verified</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                Active
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
