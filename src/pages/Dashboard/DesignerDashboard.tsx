import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Upload, Briefcase, Users, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import type { RootState } from '../../store';

export default function DesignerDashboard() {
  const { projects } = useSelector((state: RootState) => state.projects);
  const { freelancers } = useSelector((state: RootState) => state.portfolios);

  const availableProjects = projects.filter(p => p.status === 'open').slice(0, 3);
  const topFreelancers = freelancers.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Designer Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio and find new projects.</p>
        </div>
        <Link to="/dashboard/portfolio">
          <Button variant="primary">
            <Upload className="w-5 h-5 mr-2" />
            Manage Portfolio
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">4</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Clients</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">28</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">New Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Portfolio Views</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">342</p>
            </div>
            <div className="w-12 h-12 bg-[#BE3144] bg-opacity-10 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-[#BE3144]" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Projects</h2>
            <Link to="/dashboard/projects" className="text-[#BE3144] hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {availableProjects.map((project) => (
              <Card key={project.id} hover className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Open
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>Budget: {project.budget}</p>
                    <p className="mt-1">Posted by: {project.homeownerName}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Submit Proposal
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Hire Freelancers</h2>
            <Link to="/dashboard/freelancers" className="text-[#BE3144] hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {topFreelancers.map((freelancer) => (
              <Card key={freelancer.id} hover className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-gray-600">{freelancer.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{freelancer.name}</h3>
                        <p className="text-xs text-gray-500">{freelancer.location}</p>
                      </div>
                      {freelancer.aadhaarVerified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {freelancer.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{freelancer.completedJobs} jobs completed</span>
                      <span className="font-semibold text-gray-900">{freelancer.hourlyRate}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
