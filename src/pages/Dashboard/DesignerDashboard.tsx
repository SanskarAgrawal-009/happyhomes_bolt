import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Upload, Briefcase, FileText, Eye, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import StatusBadge from '../../components/StatusBadge';
import { supabase } from '../../lib/supabase';
import type { RootState } from '../../store';
import type { Database } from '../../lib/supabase';

type Requirement = Database['public']['Tables']['requirements']['Row'];
type Proposal = Database['public']['Tables']['proposals']['Row'];

interface RequirementWithHomeowner extends Requirement {
  homeowner: { full_name: string };
}

export default function DesignerDashboard() {
  const { profile } = useSelector((state: RootState) => state.user);
  const [requirements, setRequirements] = useState<RequirementWithHomeowner[]>([]);
  const [myProposals, setMyProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState({
    activeProposals: 0,
    portfolioItems: 0,
    profileViews: 0,
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
      // Fetch open requirements
      const { data: reqData } = await supabase
        .from('requirements')
        .select(`
          *,
          homeowner:profiles!requirements_homeowner_id_fkey(full_name)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(3);

      setRequirements((reqData as any) || []);

      // Fetch my proposals
      const { data: proposalsData } = await supabase
        .from('proposals')
        .select('*')
        .eq('designer_id', profile.id)
        .order('created_at', { ascending: false });

      setMyProposals(proposalsData || []);

      // Fetch portfolio count
      const { count: portfolioCount } = await supabase
        .from('portfolios')
        .select('id', { count: 'exact' })
        .eq('user_id', profile.id);

      setStats({
        activeProposals: proposalsData?.filter(p => p.status === 'pending').length || 0,
        portfolioItems: portfolioCount || 0,
        profileViews: 0, // Placeholder - would need a views tracking table
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBudget = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    if (min) return `₹${(min / 100000).toFixed(1)}L+`;
    return `Up to ₹${(max! / 100000).toFixed(1)}L`;
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
          <h1 className="text-3xl font-bold text-gray-900">Designer Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio and find new projects</p>
        </div>
        <Link to="/dashboard/portfolio">
          <Button variant="primary">
            <Upload className="w-5 h-5 mr-2" />
            Manage Portfolio
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Proposals</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeProposals}</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Portfolio Items</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.portfolioItems}</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Profile Views</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.profileViews}</p>
            </div>
            <div className="w-12 h-12 bg-pastel-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-pastel-purple" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Requirements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">New Requirements</h2>
            <Link to="/dashboard/browse-requirements" className="text-pastel-purple hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {requirements.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No new requirements available</p>
              </Card>
            ) : (
              requirements.map((req) => (
                <Card key={req.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{req.title}</h3>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{req.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p>Budget: {formatBudget(req.budget_min, req.budget_max)}</p>
                      <p className="mt-1">Posted by: {req.homeowner.full_name}</p>
                    </div>
                    <Link to={`/dashboard/requirement/${req.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* My Recent Proposals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Proposals</h2>
            <Link to="/dashboard/my-proposals" className="text-pastel-purple hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {myProposals.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-2">No proposals yet</p>
                <p className="text-sm text-gray-500">Browse requirements and submit your first proposal</p>
              </Card>
            ) : (
              myProposals.slice(0, 3).map((proposal) => (
                <Card key={proposal.id} className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Proposal #{proposal.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Cost: ₹{(proposal.cost_estimate / 100000).toFixed(1)}L
                      </p>
                    </div>
                    <StatusBadge status={proposal.status} />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{proposal.description}</p>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
