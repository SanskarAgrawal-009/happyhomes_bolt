import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Briefcase, DollarSign, FileText, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import StatusBadge from '../../components/StatusBadge';
import { supabase } from '../../lib/supabase';
import type { RootState } from '../../store';
import type { Database } from '../../lib/supabase';

type FreelancerJob = Database['public']['Tables']['freelancer_jobs']['Row'];
type JobApplication = Database['public']['Tables']['job_applications']['Row'];

interface JobWithDesigner extends FreelancerJob {
  designer: { full_name: string };
}

export default function FreelancerDashboard() {
  const { profile } = useSelector((state: RootState) => state.user);
  const [jobs, setJobs] = useState<JobWithDesigner[]>([]);
  const [myApplications, setMyApplications] = useState<JobApplication[]>([]);
  const [stats, setStats] = useState({
    activeApplications: 0,
    completedJobs: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;

    try {
      // Fetch open jobs
      const { data: jobsData } = await supabase
        .from('freelancer_jobs')
        .select(`
          *,
          designer:profiles!freelancer_jobs_designer_id_fkey(full_name)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(3);

      setJobs((jobsData as any) || []);

      // Fetch my applications
      const { data: applicationsData } = await supabase
        .from('job_applications')
        .select('*')
        .eq('freelancer_id', profile.id)
        .order('created_at', { ascending: false });

      setMyApplications(applicationsData || []);

      setStats({
        activeApplications: applicationsData?.filter(a => a.status === 'pending').length || 0,
        completedJobs: 0, // Placeholder
        totalEarnings: 0, // Placeholder
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
          <p className="text-gray-600 mt-1">Find jobs and manage your applications</p>
        </div>
        <Link to="/dashboard/browse-jobs">
          <Button variant="primary">
            <Briefcase className="w-5 h-5 mr-2" />
            Browse Jobs
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeApplications}</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completedJobs}</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Jobs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Jobs</h2>
            <Link to="/dashboard/browse-jobs" className="text-pastel-purple hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No jobs available</p>
              </Card>
            ) : (
              jobs.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p>Budget: ₹{job.budget.toLocaleString()}</p>
                      <p className="mt-1">Posted by: {job.designer.full_name}</p>
                    </div>
                    <Link to={`/dashboard/job/${job.id}`}>
                      <Button variant="outline" size="sm">
                        View & Apply
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* My Applications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
            <Link to="/dashboard/my-applications" className="text-pastel-purple hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {myApplications.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-2">No applications yet</p>
                <p className="text-sm text-gray-500">Browse jobs and submit your first application</p>
              </Card>
            ) : (
              myApplications.slice(0, 3).map((application) => (
                <Card key={application.id} className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Application #{application.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Quoted Price: ₹{application.quoted_price.toLocaleString()}
                      </p>
                    </div>
                    <StatusBadge status={application.status} />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{application.proposal}</p>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
