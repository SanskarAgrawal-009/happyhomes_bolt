import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/supabase';
import { setUserRole, setAuthenticated, setUserProfile, clearUser } from '../store/slices/userSlice';
import type { UserRole } from '../store/slices/userSlice';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check for existing session on mount
        const initializeAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Session error:', error);
                    setLoading(false);
                    return;
                }

                if (session?.user) {
                    setUser(session.user);
                    await fetchUserProfile(session.user.id);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);
            setUser(session?.user ?? null);

            if (session?.user) {
                await fetchUserProfile(session.user.id);
            } else {
                dispatch(clearUser());
                setLoading(false);
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
                console.error('Profile fetch error:', error);
                throw error;
            }

            if (data) {
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
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
        try {
            // Sign up the user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                    }
                }
            });

            if (authError) throw authError;

            if (authData.user && authData.session) {
                // Wait a moment for the auth session to be fully established
                await new Promise(resolve => setTimeout(resolve, 500));

                // Create profile - the user is now authenticated, so RLS will allow this
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        full_name: fullName,
                        email,
                        role,
                    });

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    throw profileError;
                }

                return { success: true, user: authData.user };
            }

            return { success: false, error: 'Failed to create user' };
        } catch (error: any) {
            console.error('Signup error:', error);
            return { success: false, error: error.message };
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            console.log('Attempting sign in for:', email);

            // Add timeout to prevent hanging (10 seconds)
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Sign in request timeout. Please check your internet connection and try again.')), 10000)
            );

            const signInPromise = supabase.auth.signInWithPassword({
                email,
                password,
            });

            const { data, error } = await Promise.race([signInPromise, timeoutPromise]) as any;

            if (error) {
                console.error('Sign in error:', error);
                throw error;
            }

            console.log('Sign in successful:', data.user?.email);
            return { success: true, user: data.user };
        } catch (error: any) {
            console.error('Sign in exception:', error);
            return { success: false, error: error.message || 'Failed to sign in. Please check your credentials.' };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            dispatch(clearUser());
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    };

    return {
        user,
        loading,
        signUp,
        signIn,
        signOut,
    };
}
