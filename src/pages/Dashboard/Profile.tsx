import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, MapPin, Phone, Save } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Card from '../../components/ui/Card';
import type { RootState } from '../../store';
import { supabase } from '../../lib/supabase';
import { updateUserProfile } from '../../store/slices/userSlice';
import { uploadAvatar } from '../../lib/storage';

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, role } = useSelector((state: RootState) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState('');

  // Load profile data when component mounts or profile changes
  useEffect(() => {
    if (profile) {
      setName(profile.full_name || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setLocation(profile.location || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size should be less than 5MB');
      return;
    }

    setUploadingAvatar(true);
    setMessage('');

    try {
      // Upload to Supabase Storage
      const publicUrl = await uploadAvatar(profile.id, file);

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update local state and Redux
      setAvatarUrl(publicUrl);
      dispatch(updateUserProfile({ avatar_url: publicUrl }));

      setMessage('Profile photo updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      setMessage('Failed to upload photo: ' + error.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!profile) {
        throw new Error('No profile found');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          phone,
          location,
          bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update Redux store
      dispatch(updateUserProfile({
        full_name: name,
        phone,
        location,
        bio,
      }));

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
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
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              className="w-full mb-4"
              onClick={handleChangePhotoClick}
              disabled={uploadingAvatar}
            >
              {uploadingAvatar ? 'Uploading...' : 'Change Photo'}
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
            {message && (
              <div className={`px - 4 py - 3 rounded - lg ${message.includes('success')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
                } `}>
                {message}
              </div>
            )}

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
              disabled
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
              <Button type="submit" variant="primary" disabled={loading}>
                <Save className="w-5 h-5 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
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
