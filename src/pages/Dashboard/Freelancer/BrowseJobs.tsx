import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Search } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import StatusBadge from '../../../components/StatusBadge';
import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../lib/supabase';

type FreelancerJob = Database['public']['Tables']['freelancer_jobs']['Row'];

interface JobWithDesigner extends FreelancerJob {
    designer: { full_name: string };
    applicationCount: number;
}

export default function BrowseJobs() {
    const [jobs, setJobs] = useState<JobWithDesigner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const { data: jobsData, error } = await supabase
                .from('freelancer_jobs')
                .select(`
          *,
          designer:profiles!freelancer_jobs_designer_id_fkey(full_name)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Fetch application counts
            const jobsWithCounts = await Promise.all(
                (jobsData as any || []).map(async (job: any) => {
                    const { count } = await supabase
                        .from('job_applications')
                        .select('id', { count: 'exact' })
                        .eq('job_id', job.id);

                    return {
                        ...job,
                        applicationCount: count || 0,
                    };
                })
            );

            setJobs(jobsWithCounts);
        } catch (error) {
            console.error('Error fetching jobs:', error);
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

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
        return matchesSearch && matchesCategory && job.status === 'open';
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading jobs...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
                <p className="text-gray-600 mt-1">Find freelance opportunities that match your skills</p>
            </div>

            {/* Filters */}
            <Card className="p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        placeholder="Search by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            <option value="Carpentry">Carpentry</option>
                            <option value="Painting">Painting</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Masonry">Masonry</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Jobs List */}
            {filteredJobs.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-gray-600">No jobs found matching your criteria</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredJobs.map((job) => (
                        <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {job.title}
                                        </h3>
                                        <StatusBadge status={job.status} />
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                            {job.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 line-clamp-2 mb-3">
                                        {job.description}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span>Budget: ₹{job.budget.toLocaleString()}</span>
                                </div>
                                {job.location && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span>{job.location}</span>
                                    </div>
                                )}
                                {job.deadline && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Deadline: {formatDate(job.deadline)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="text-sm text-gray-500">
                                    <p>Posted by: <span className="font-medium">{job.designer.full_name}</span></p>
                                    <p className="mt-1">{job.applicationCount} {job.applicationCount === 1 ? 'application' : 'applications'}</p>
                                </div>
                                <Link to={`/dashboard/job/${job.id}`}>
                                    <Button variant="primary" size="sm">
                                        View & Apply
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
