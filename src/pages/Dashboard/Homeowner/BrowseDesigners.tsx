import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface DesignerWithStats extends Profile {
    portfolioCount: number;
    averageRating: number;
    reviewCount: number;
}

export default function BrowseDesigners() {
    const [designers, setDesigners] = useState<DesignerWithStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        fetchDesigners();
    }, []);

    const fetchDesigners = async () => {
        try {
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'designer');

            if (profilesError) throw profilesError;

            // Fetch portfolio counts and reviews for each designer
            const designersWithStats = await Promise.all(
                (profilesData || []).map(async (designer) => {
                    const [portfolioResult, reviewsResult] = await Promise.all([
                        supabase
                            .from('portfolios')
                            .select('id', { count: 'exact' })
                            .eq('user_id', designer.id),
                        supabase
                            .from('reviews')
                            .select('rating')
                            .eq('reviewee_id', designer.id),
                    ]);

                    const portfolioCount = portfolioResult.count || 0;
                    const reviews = reviewsResult.data || [];
                    const averageRating = reviews.length > 0
                        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                        : 0;

                    return {
                        ...designer,
                        portfolioCount,
                        averageRating,
                        reviewCount: reviews.length,
                    };
                })
            );

            setDesigners(designersWithStats);
        } catch (error) {
            console.error('Error fetching designers:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDesigners = designers.filter((designer) => {
        const matchesSearch = designer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            designer.bio?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = !locationFilter ||
            designer.location?.toLowerCase().includes(locationFilter.toLowerCase());
        return matchesSearch && matchesLocation;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading designers...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Browse Designers</h1>
                <p className="text-gray-600 mt-1">Find the perfect designer for your project</p>
            </div>

            {/* Filters */}
            <Card className="p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        placeholder="Search by name or expertise..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Input
                        placeholder="Filter by location..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    />
                </div>
            </Card>

            {/* Designers Grid */}
            {filteredDesigners.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-gray-600">No designers found matching your criteria</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDesigners.map((designer) => (
                        <Card key={designer.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                                    {designer.avatar_url ? (
                                        <img
                                            src={designer.avatar_url}
                                            alt={designer.full_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-400">
                                            {designer.full_name.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {designer.full_name}
                                </h3>

                                {/* Location */}
                                {designer.location && (
                                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                        <MapPin className="w-4 h-4" />
                                        <span>{designer.location}</span>
                                    </div>
                                )}

                                {/* Rating */}
                                {designer.reviewCount > 0 && (
                                    <div className="flex items-center gap-1 mb-3">
                                        <Star className="w-4 h-4 fill-luxury-white text-gray-800" />
                                        <span className="font-medium">{designer.averageRating.toFixed(1)}</span>
                                        <span className="text-sm text-gray-600">
                                            ({designer.reviewCount} {designer.reviewCount === 1 ? 'review' : 'reviews'})
                                        </span>
                                    </div>
                                )}

                                {/* Bio */}
                                {designer.bio && (
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {designer.bio}
                                    </p>
                                )}

                                {/* Portfolio Count */}
                                <p className="text-sm text-gray-500 mb-4">
                                    {designer.portfolioCount} {designer.portfolioCount === 1 ? 'project' : 'projects'}
                                </p>

                                {/* Actions */}
                                <div className="flex gap-2 w-full">
                                    <Link to={`/dashboard/designer/${designer.id}`} className="flex-1">
                                        <Button variant="primary" size="sm" className="w-full">
                                            View Profile
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
