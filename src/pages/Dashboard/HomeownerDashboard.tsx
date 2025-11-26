import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus, MessageSquare, FileText, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import RatingStars from '../../components/RatingStars';
import type { RootState } from '../../store';

export default function HomeownerDashboard() {
  const { projects } = useSelector((state: RootState) => state.projects);
  const { designers } = useSelector((state: RootState) => state.portfolios);
  const [searchTerm, setSearchTerm] = useState('');

  const myProjects = projects.slice(0, 2);
  const topDesigners = designers.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Homeowner Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Manage your projects and find designers.</p>
        </div>
        <Link to="/dashboard/post-project">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Post New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">2</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Proposals</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">16</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Messages</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
            <Link to="/dashboard/projects" className="text-pastel-purple hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {myProjects.map((project) => (
              <Card key={project.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'open' ? 'bg-green-100 text-green-700' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status === 'in-progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Budget: {project.budget}</span>
                  <span className="text-pastel-purple font-semibold">{project.proposals} proposals</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Browse Designers</h2>
            <Link to="/dashboard/designers" className="text-pastel-purple hover:underline font-medium">
              View All
            </Link>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search designers..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {topDesigners.map((designer) => (
              <Card key={designer.id} hover className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-gray-600">{designer.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-gray-900">{designer.name}</h3>
                      {designer.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{designer.specialty}</p>
                    <RatingStars rating={designer.rating} size={14} />
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{designer.completedProjects} projects</span>
                      <span>{designer.hourlyRate}</span>
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
