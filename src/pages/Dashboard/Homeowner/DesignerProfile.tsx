import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    MapPin, Star, MessageSquare, Heart, ArrowLeft,
    Mail, Phone, Briefcase, Award
} from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { supabase } from '../../../lib/supabase';
import type { RootState } from '../../../store';
import type { Database } from '../../../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Portfolio = Database['public']['Tables']['portfolios']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

interface ReviewWithReviewer extends Review {
    reviewer: Profile;
}

export default function DesignerProfile() {
    const { designerId } = useParams<{ designerId: string }>();
    const navigate = useNavigate();
    const { profile: currentUser } = useSelector((state: RootState) => state.user);

    const [designer, setDesigner] = useState<Profile | null>(null);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [reviews, setReviews] = useState<ReviewWithReviewer[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (designerId) {
            fetchDesignerProfile();
            fetchPortfolios();
            fetchReviews();
            checkIfFavorite();
        }
    }, [designerId]);

    const fetchDesignerProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', designerId)
                .single();

            if (error) throw error;
            setDesigner(data);
        } catch (error) {
            console.error('Error fetching designer:', error);
        }
    };

    const fetchPortfolios = async () => {
        try {
            const { data, error } = await supabase
                .from('portfolios')
                .select('*')
                .eq('user_id', designerId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPortfolios(data || []);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const { data: reviewsData, error: reviewsError } = await supabase
                .from('reviews')
                .select('*')
                .eq('reviewee_id', designerId)
                .order('created_at', { ascending: false });

            if (reviewsError) throw reviewsError;

            // Fetch reviewer profiles
            const reviewsWithReviewers = await Promise.all(
                (reviewsData || []).map(async (review) => {
                    const { data: reviewer } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', review.reviewer_id)
                        .single();

                    return {
                        ...review,
                        reviewer: reviewer!,
                    };
                })
            );

            setReviews(reviewsWithReviewers);

            // Calculate average rating
            if (reviewsData && reviewsData.length > 0) {
                const avg = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;
                setAverageRating(avg);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkIfFavorite = async () => {
        if (!currentUser) return;

        try {
            const { data } = await supabase
                .from('favorites')
                .select('id')
                .eq('user_id', currentUser.id)
                .eq('favorited_user_id', designerId)
                .single();

            setIsFavorite(!!data);
        } catch (error) {
            // Not a favorite
        }
    };

    const toggleFavorite = async () => {
        if (!currentUser) return;

        try {
            if (isFavorite) {
                await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', currentUser.id)
                    .eq('favorited_user_id', designerId);
                setIsFavorite(false);
            } else {
                await supabase
                    .from('favorites')
                    .insert({
                        user_id: currentUser.id,
                        favorited_user_id: designerId!,
                    });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleStartChat = async () => {
        if (!currentUser || !designerId) return;

        try {
            // Check if conversation already exists
            const { data: existingConv } = await supabase
                .from('conversations')
                .select('id')
                .or(`and(participant_1_id.eq.${currentUser.id},participant_2_id.eq.${designerId}),and(participant_1_id.eq.${designerId},participant_2_id.eq.${currentUser.id})`)
                .single();

            if (existingConv) {
                navigate('/dashboard/chat');
                return;
            }

            // Create new conversation
            const { error } = await supabase
                .from('conversations')
                .insert({
                    participant_1_id: currentUser.id,
                    participant_2_id: designerId,
                });

            if (error) throw error;

            navigate('/dashboard/chat');
        } catch (error) {
            console.error('Error starting chat:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading profile...</div>
            </div>
        );
    }

    if (!designer) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Designer not found</p>
                <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Designers</span>
            </button>

            {/* Profile Header */}
            <Card className="p-8 mb-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {designer.avatar_url ? (
                            <img
                                src={designer.avatar_url}
                                alt={designer.full_name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-4xl font-bold text-gray-400">
                                {designer.full_name.charAt(0)}
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {designer.full_name}
                                </h1>
                                {designer.location && (
                                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                                        <MapPin className="w-5 h-5" />
                                        <span>{designer.location}</span>
                                    </div>
                                )}
                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.round(averageRating)
                                                            ? 'fill-luxury-white text-gray-800'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="font-semibold">{averageRating.toFixed(1)}</span>
                                        <span className="text-gray-600">
                                            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    variant={isFavorite ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={toggleFavorite}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                </Button>
                            </div>
                        </div>

                        {designer.bio && (
                            <p className="text-gray-700 mb-6">{designer.bio}</p>
                        )}

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {designer.email && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-5 h-5" />
                                    <span>{designer.email}</span>
                                </div>
                            )}
                            {designer.phone && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-5 h-5" />
                                    <span>{designer.phone}</span>
                                </div>
                            )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3">
                            <Button variant="primary" onClick={handleStartChat}>
                                <MessageSquare className="w-5 h-5 mr-2" />
                                Start Chat
                            </Button>
                            <Button variant="outline">
                                <Briefcase className="w-5 h-5 mr-2" />
                                Request Proposal
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Portfolio */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
                    {portfolios.length === 0 ? (
                        <Card className="p-12 text-center">
                            <p className="text-gray-600">No portfolio items yet</p>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portfolios.map((item) => (
                                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Reviews */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                    {reviews.length === 0 ? (
                        <Card className="p-6 text-center">
                            <p className="text-gray-600">No reviews yet</p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <Card key={review.id} className="p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                                            {review.reviewer.avatar_url ? (
                                                <img
                                                    src={review.reviewer.avatar_url}
                                                    alt={review.reviewer.full_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-sm font-bold text-gray-400">
                                                    {review.reviewer.full_name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">
                                                {review.reviewer.full_name}
                                            </h4>
                                            <div className="flex items-center gap-1 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating
                                                                ? 'fill-luxury-white text-gray-800'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {review.comment && (
                                        <p className="text-sm text-gray-700">{review.comment}</p>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
