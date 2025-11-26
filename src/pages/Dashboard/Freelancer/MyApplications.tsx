import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Eye, DollarSign } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../components/StatusBadge';
import { supabase } from '../../../lib/supabase';
import type { RootState } from '../../../store';
import type { Database } from '../../../lib/supabase';

type JobApplication = Database['public']['Tables']['job_applications']['Row'];

interface ApplicationWithJob extends JobApplication {
    job: {
        title: string;
        designer_id: string;
    };
    designer: {
        full_name: string;
    };
}

export default function MyApplications() {
    const { profile } = useSelector((state: RootState) => state.user);
    const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        if (profile) {
            fetchApplications();
        }
    }, [profile]);

    const fetchApplications = async () => {
        if (!profile) return;

        try {
            const { data, error } = await supabase
                .from('job_applications')
                .select(`
          *,
          job:freelancer_jobs!job_applications_job_id_fkey(title, designer_id),
          designer:freelancer_jobs!job_applications_job_id_fkey(
            profiles!freelancer_jobs_designer_id_fkey(full_name)
          )
        `)
                .eq('freelancer_id', profile.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Transform the data
            const transformedData = (data as any || []).map((app: any) => ({
                ...app,
                designer: {
                    full_name: app.designer?.profiles?.full_name || 'Unknown',
                },
            }));

            setApplications(transformedData);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const filteredApplications = applications.filter((app) => {
        if (statusFilter === 'all') return true;
        return app.status === statusFilter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading applications...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                    <p className="text-gray-600 mt-1">Track all your job applications</p>
                </div>
                <Link to="/dashboard/browse-jobs">
                    <Button variant="primary">
                        Browse Jobs
                    </Button>
                </Link>
            </div>

            {/* Filter */}
            <Card className="p-6 mb-8">
                <div className="max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Status
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="withdrawn">Withdrawn</option>
                    </select>
                </div>
            </Card>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-gray-600 mb-4">
                        {statusFilter === 'all'
                            ? 'No applications submitted yet'
                            : `No ${statusFilter} applications`}
                    </p>
                    <Link to="/dashboard/browse-jobs">
                        <Button variant="primary">
                            Browse Jobs
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredApplications.map((application) => (
                        <Card key={application.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {application.job.title}
                                        </h3>
                                        <StatusBadge status={application.status} />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Designer: <span className="font-medium">{application.designer.full_name}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Your Proposal</h4>
                                <p className="text-gray-700 text-sm mb-3">{application.proposal}</p>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span>Quoted Price: ₹{application.quoted_price.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <span className="text-sm text-gray-500">
                                    Applied on {formatDate(application.created_at)}
                                </span>
                                <Link to={`/dashboard/job/${application.job_id}`}>
                                    <Button variant="outline" size="sm">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Job
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
