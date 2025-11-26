import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Eye, Calendar, DollarSign } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../components/StatusBadge';
import { supabase } from '../../../lib/supabase';
import type { RootState } from '../../../store';
import type { Database } from '../../../lib/supabase';

type Proposal = Database['public']['Tables']['proposals']['Row'];

interface ProposalWithRequirement extends Proposal {
    requirement: {
        title: string;
        homeowner_id: string;
    };
    homeowner: {
        full_name: string;
    };
}

export default function MyProposals() {
    const { profile } = useSelector((state: RootState) => state.user);
    const [proposals, setProposals] = useState<ProposalWithRequirement[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        if (profile) {
            fetchProposals();
        }
    }, [profile]);

    const fetchProposals = async () => {
        if (!profile) return;

        try {
            const { data, error } = await supabase
                .from('proposals')
                .select(`
          *,
          requirement:requirements!proposals_requirement_id_fkey(title, homeowner_id),
          homeowner:requirements!proposals_requirement_id_fkey(
            profiles!requirements_homeowner_id_fkey(full_name)
          )
        `)
                .eq('designer_id', profile.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Transform the data to flatten the nested structure
            const transformedData = (data as any || []).map((proposal: any) => ({
                ...proposal,
                homeowner: {
                    full_name: proposal.homeowner?.profiles?.full_name || 'Unknown',
                },
            }));

            setProposals(transformedData);
        } catch (error) {
            console.error('Error fetching proposals:', error);
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

    const filteredProposals = proposals.filter((proposal) => {
        if (statusFilter === 'all') return true;
        return proposal.status === statusFilter;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading proposals...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Proposals</h1>
                    <p className="text-gray-600 mt-1">Track all your submitted proposals</p>
                </div>
                <Link to="/dashboard/browse-requirements">
                    <Button variant="primary">
                        Browse Requirements
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

            {/* Proposals List */}
            {filteredProposals.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-gray-600 mb-4">
                        {statusFilter === 'all'
                            ? 'No proposals submitted yet'
                            : `No ${statusFilter} proposals`}
                    </p>
                    <Link to="/dashboard/browse-requirements">
                        <Button variant="primary">
                            Browse Requirements
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredProposals.map((proposal) => (
                        <Card key={proposal.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {proposal.requirement.title}
                                        </h3>
                                        <StatusBadge status={proposal.status} />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Client: <span className="font-medium">{proposal.homeowner.full_name}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Your Proposal</h4>
                                <p className="text-gray-700 text-sm mb-3">{proposal.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <DollarSign className="w-4 h-4" />
                                        <span>Cost Estimate: ₹{(proposal.cost_estimate / 100000).toFixed(1)}L</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Timeline: {proposal.timeline_estimate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <span className="text-sm text-gray-500">
                                    Submitted on {formatDate(proposal.created_at)}
                                </span>
                                <Link to={`/dashboard/requirement/${proposal.requirement_id}`}>
                                    <Button variant="outline" size="sm">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Requirement
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
