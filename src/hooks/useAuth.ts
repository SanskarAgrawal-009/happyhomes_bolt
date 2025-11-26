import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../lib/supabase';
import { clearUser } from '../store/slices/userSlice';
import type { UserRole } from '../store/slices/userSlice';
import type { RootState } from '../store';

export function useAuth() {
    const dispatch = useDispatch();
    const { profile, isLoading, isAuthenticated } = useSelector((state: RootState) => state.user);

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

    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                }
            });

            if (error) throw error;

            return { success: true, data };
        } catch (error: any) {
            console.error('Google sign in error:', error);
            return { success: false, error: error.message };
        }
    };

    return {
        user: profile, // Mapping Redux profile to 'user' for compatibility, though types differ slightly
        loading: isLoading,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
    };
}
