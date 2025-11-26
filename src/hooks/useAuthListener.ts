import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/supabase';
import { setUserRole, setAuthenticated, setUserProfile, clearUser, setLoading } from '../store/slices/userSlice';
import type { UserRole } from '../store/slices/userSlice';

export function useAuthListener() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check for existing session on mount
        const initializeAuth = async () => {
            dispatch(setLoading(true));
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Session error:', error);
                    dispatch(setLoading(false));
                    return;
                }

                if (session?.user) {
                    await fetchUserProfile(session.user.id);
                } else {
                    dispatch(setLoading(false));
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                dispatch(setLoading(false));
            }
        };

        initializeAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);

            if (session?.user) {
                // If we are just signing in, fetchUserProfile will handle setLoading(false)
                // But if we are already loaded and just refreshing token, we might not need to do anything heavy
                // However, for safety, let's ensure profile is fetched if missing
                await fetchUserProfile(session.user.id);
            } else {
                dispatch(clearUser());
                dispatch(setLoading(false));
            }
        });

        return () => subscription.unsubscribe();
    }, [dispatch]);

    const fetchUserProfile = async (userId: string) => {
        try {
            console.log('Fetching user profile for:', userId);

            // Add timeout to prevent hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
            );

            const fetchPromise = supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

            if (error) {
                // If profile doesn't exist (Google OAuth user), create one
                if (error.code === 'PGRST116') {
                    console.log('Profile not found, creating new profile for Google OAuth user');

                    // Get user data from auth
                    const { data: { user } } = await supabase.auth.getUser();

                    if (user) {
                        const newProfile = {
                            id: user.id,
                            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                            email: user.email || '',
                            role: 'homeowner' as UserRole, // Default role for Google OAuth users
                        };

                        const { data: createdProfile, error: createError } = await supabase
                            .from('profiles')
                            .insert(newProfile)
                            .select()
                            .single();

                        if (createError) {
                            console.error('Error creating profile:', createError);
                            throw createError;
                        }

                        if (createdProfile) {
                            console.log('Profile created successfully:', createdProfile.email, 'Role:', createdProfile.role);
                            dispatch(setUserRole(createdProfile.role as UserRole));
                            dispatch(setAuthenticated(true));
                            dispatch(setUserProfile(createdProfile));
                        }
                    }
                } else {
                    console.error('Profile fetch error:', error);
                    throw error;
                }
            } else if (data) {
                console.log('Profile fetched successfully:', data.email, 'Role:', data.role);
                dispatch(setUserRole(data.role as UserRole));
                dispatch(setAuthenticated(true));
                dispatch(setUserProfile(data));
            } else {
                console.warn('No profile data found for user:', userId);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Don't throw - allow the app to continue even if profile fetch fails
            // The user is still authenticated, just without profile data
        } finally {
            dispatch(setLoading(false));
        }
    };
}
