import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import Card from '../../components/ui/Card';

export default function PostProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('living-room');
  const [timeline, setTimeline] = useState('');

  const categoryOptions = [
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'office', label: 'Home Office' },
    { value: 'full-home', label: 'Full Home' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Project posted successfully! Designers will start submitting proposals soon.');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post New Project</h1>
        <p className="text-gray-600 mt-1">Share your requirements and receive proposals from designers.</p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-pastel-purple" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
              <p className="text-sm text-gray-600">Provide clear information to attract the right professionals</p>
            </div>
          </div>

          <Input
            label="Project Title"
            placeholder="e.g., Modern Living Room Redesign"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <TextArea
            label="Project Description"
            placeholder="Describe your project in detail. Include dimensions, style preferences, specific requirements, and any inspiration you have in mind..."
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Budget Range"
              placeholder="e.g., $5,000 - $8,000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />

            <Input
              label="Timeline"
              placeholder="e.g., 2-3 months"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              required
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-pastel-purple font-bold">1.</span>
                <span>Your project will be visible to verified designers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pastel-purple font-bold">2.</span>
                <span>Designers will submit proposals with their ideas and quotes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pastel-purple font-bold">3.</span>
                <span>Review proposals and select the best designer for your project</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pastel-purple font-bold">4.</span>
                <span>Collaborate and bring your vision to life</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              Post Project
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
