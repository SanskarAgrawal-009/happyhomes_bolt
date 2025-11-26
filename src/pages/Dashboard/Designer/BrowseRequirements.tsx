import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Eye, Search } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import StatusBadge from '../../../components/StatusBadge';
import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../lib/supabase';

type Requirement = Database['public']['Tables']['requirements']['Row'];

interface RequirementWithHomeowner extends Requirement {
    homeowner: { full_name: string; location: string | null };
    proposalCount: number;
}

export default function BrowseRequirements() {
    const [requirements, setRequirements] = useState<RequirementWithHomeowner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchRequirements();
    }, []);

    const fetchRequirements = async () => {
        try {
            const { data: reqData, error } = await supabase
                .from('requirements')
                .select(`
          *,
          homeowner:profiles!requirements_homeowner_id_fkey(full_name, location)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Fetch proposal counts for each requirement
            const requirementsWithCounts = await Promise.all(
                (reqData as any || []).map(async (req: any) => {
                    const { count } = await supabase
                        .from('proposals')
                        .select('id', { count: 'exact' })
                        .eq('requirement_id', req.id);

                    return {
                        ...req,
                        proposalCount: count || 0,
                    };
                })
            );

            setRequirements(requirementsWithCounts);
        } catch (error) {
            console.error('Error fetching requirements:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatBudget = (min: number | null, max: number | null) => {
        if (!min && !max) return 'Budget not specified';
        if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
        if (min) return `₹${(min / 100000).toFixed(1)}L+`;
        return `Up to ₹${(max! / 100000).toFixed(1)}L`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const filteredRequirements = requirements.filter((req) => {
        const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading requirements...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Browse Requirements</h1>
                <p className="text-gray-600 mt-1">Find projects that match your expertise</p>
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
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Requirements List */}
            {filteredRequirements.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-gray-600">No requirements found matching your criteria</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredRequirements.map((requirement) => (
                        <Card key={requirement.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {requirement.title}
                                        </h3>
                                        <StatusBadge status={requirement.status} />
                                    </div>
                                    <p className="text-gray-600 line-clamp-2 mb-3">
                                        {requirement.description}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{requirement.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{formatBudget(requirement.budget_min, requirement.budget_max)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>{requirement.timeline}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Eye className="w-4 h-4" />
                                    <span>
                                        {requirement.proposalCount} {requirement.proposalCount === 1 ? 'proposal' : 'proposals'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="text-sm text-gray-500">
                                    <p>Posted by: <span className="font-medium">{requirement.homeowner.full_name}</span></p>
                                    <p className="mt-1">Posted on {formatDate(requirement.created_at)}</p>
                                </div>
                                <Link to={`/dashboard/requirement/${requirement.id}`}>
                                    <Button variant="primary" size="sm">
                                        View & Submit Proposal
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
