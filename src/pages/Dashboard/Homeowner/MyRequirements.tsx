import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Calendar, MapPin, DollarSign } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../components/StatusBadge';
import { supabase } from '../../../lib/supabase';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { Database } from '../../../lib/supabase';

type Requirement = Database['public']['Tables']['requirements']['Row'];

interface RequirementWithProposals extends Requirement {
    proposalCount: number;
}

export default function MyRequirements() {
    const { profile } = useSelector((state: RootState) => state.user);
    const [requirements, setRequirements] = useState<RequirementWithProposals[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile) {
            fetchRequirements();
        }
    }, [profile]);

    const fetchRequirements = async () => {
        if (!profile) return;

        try {
            const { data: requirementsData, error: requirementsError } = await supabase
                .from('requirements')
                .select('*')
                .eq('homeowner_id', profile.id)
                .order('created_at', { ascending: false });

            if (requirementsError) throw requirementsError;

            // Fetch proposal counts for each requirement
            const requirementsWithProposals = await Promise.all(
                (requirementsData || []).map(async (req) => {
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

            setRequirements(requirementsWithProposals);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading your requirements...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Requirements</h1>
                    <p className="text-gray-600 mt-1">Manage your posted project requirements</p>
                </div>
                <Link to="/dashboard/post-requirement">
                    <Button variant="primary">
                        <Plus className="w-5 h-5 mr-2" />
                        Post New Requirement
                    </Button>
                </Link>
            </div>

            {requirements.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No requirements posted yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Start by posting your first project requirement to connect with talented designers
                        </p>
                        <Link to="/dashboard/post-requirement">
                            <Button variant="primary">
                                <Plus className="w-5 h-5 mr-2" />
                                Post Your First Requirement
                            </Button>
                        </Link>
                    </div>
                </Card>
            ) : (
                <div className="space-y-4">
                    {requirements.map((requirement) => (
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
                                <span className="text-sm text-gray-500">
                                    Posted on {formatDate(requirement.created_at)}
                                </span>
                                <div className="flex gap-2">
                                    {requirement.proposalCount > 0 && (
                                        <Link to={`/dashboard/proposals/${requirement.id}`}>
                                            <Button variant="primary" size="sm">
                                                View Proposals ({requirement.proposalCount})
                                            </Button>
                                        </Link>
                                    )}
                                    <Link to={`/dashboard/requirement/${requirement.id}`}>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
