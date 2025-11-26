import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import TextArea from '../../../components/ui/TextArea';
import Card from '../../../components/ui/Card';
import { supabase } from '../../../lib/supabase';
import type { RootState } from '../../../store';

export default function PostRequirement() {
    const navigate = useNavigate();
    const { profile } = useSelector((state: RootState) => state.user);

    const [title, setTitle] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [budgetMin, setBudgetMin] = useState('');
    const [budgetMax, setBudgetMax] = useState('');
    const [stylePreferences, setStylePreferences] = useState('');
    const [timeline, setTimeline] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const propertyTypes = [
        'Apartment',
        'Villa',
        'Independent House',
        'Penthouse',
        'Studio',
        'Office Space',
        'Commercial Space',
    ];

    const timelineOptions = [
        '1-2 months',
        '3-4 months',
        '5-6 months',
        '6+ months',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profile) {
            setError('Please sign in to post a requirement');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error: insertError } = await supabase
                .from('requirements')
                .insert({
                    homeowner_id: profile.id,
                    title,
                    property_type: propertyType,
                    location,
                    budget_min: budgetMin ? parseFloat(budgetMin) : null,
                    budget_max: budgetMax ? parseFloat(budgetMax) : null,
                    style_preferences: stylePreferences || null,
                    timeline,
                    description,
                    status: 'open',
                });

            if (insertError) throw insertError;

            navigate('/dashboard/my-requirements');
        } catch (err: any) {
            console.error('Error posting requirement:', err);
            setError(err.message || 'Failed to post requirement');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Post Your Requirement</h1>
                <p className="text-gray-600 mt-1">Tell us about your interior design project</p>
            </div>

            <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Project Title"
                        placeholder="e.g., Modern Living Room Redesign"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type *
                            </label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                            >
                                <option value="">Select property type</option>
                                {propertyTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Location"
                            placeholder="e.g., Mumbai, Maharashtra"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Minimum Budget (₹)"
                            placeholder="e.g., 500000"
                            value={budgetMin}
                            onChange={(e) => setBudgetMin(e.target.value)}
                        />

                        <Input
                            type="number"
                            label="Maximum Budget (₹)"
                            placeholder="e.g., 1000000"
                            value={budgetMax}
                            onChange={(e) => setBudgetMax(e.target.value)}
                        />
                    </div>

                    <Input
                        label="Style Preferences (Optional)"
                        placeholder="e.g., Modern, Minimalist, Traditional"
                        value={stylePreferences}
                        onChange={(e) => setStylePreferences(e.target.value)}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timeline *
                        </label>
                        <select
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                        >
                            <option value="">Select timeline</option>
                            {timelineOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <TextArea
                        label="Project Description"
                        placeholder="Describe your project requirements, preferences, and any specific details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={6}
                    />

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Posting...' : 'Post Requirement'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
