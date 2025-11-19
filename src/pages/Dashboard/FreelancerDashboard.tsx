import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Briefcase, DollarSign, CheckCircle, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import type { RootState } from '../../store';

export default function FreelancerDashboard() {
  const { projects } = useSelector((state: RootState) => state.projects);

  const availableJobs = projects.filter(p => p.status === 'open').slice(0, 4);

  const recentApplications = [
    {
      id: '1',
      projectTitle: 'Kitchen Renovation',
      appliedDate: '2024-01-18',
      status: 'pending',
    },
    {
      id: '2',
      projectTitle: 'Living Room Design',
      appliedDate: '2024-01-16',
      status: 'accepted',
    },
    {
      id: '3',
      projectTitle: 'Bedroom Makeover',
      appliedDate: '2024-01-14',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
          <p className="text-gray-600 mt-1">Browse jobs and manage your applications.</p>
        </div>
        <Link to="/dashboard/profile">
          <Button variant="primary">
            Update Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">6</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹2.4L</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">89</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Apps</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Jobs</h2>
            <Link to="/dashboard/jobs" className="text-[#BE3144] hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <Card key={job.id} hover className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Open
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-gray-900 font-semibold">{job.budget}</p>
                    <p className="text-gray-500 text-xs mt-1">Posted {job.createdAt}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
            <Link to="/dashboard/applications" className="text-[#BE3144] hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <Card key={app.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{app.projectTitle}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Applied on {app.appliedDate}</p>
              </Card>
            ))}

            <Card className="p-6 bg-gradient-to-br from-gray-50 to-white">
              <h3 className="font-bold text-gray-900 mb-2">Complete Your Profile</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add more skills and certifications to increase your chances of getting hired.
              </p>
              <Link to="/dashboard/profile">
                <Button variant="outline" size="sm" className="w-full">
                  Update Profile
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
