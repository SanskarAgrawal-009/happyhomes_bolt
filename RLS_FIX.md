# Quick Fix for RLS Error

## The Problem
You're getting "new row violates row-level security policy for table profiles" because of how Supabase handles authentication.

## Solution: Disable Email Confirmation (for development)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. In the left sidebar, click **Authentication**
4. Click on **Email Templates** or **Settings** (depending on your Supabase version)
5. Look for **"Email Confirmations"** or **"Confirm email"** setting
6. **DISABLE** or **UNCHECK** the email confirmation option
7. Click **Save**

**Alternative path if the above doesn't work:**
1. Go to **Project Settings** (gear icon in bottom left)
2. Click **Authentication** in the settings menu
3. Scroll to find **"Enable email confirmations"**
4. Toggle it **OFF**
5. Click **Save**

This will allow users to sign up without email confirmation, which is fine for development.

## Alternative: Keep Email Confirmation Enabled

If you want to keep email confirmation enabled (recommended for production):

1. After signing up, check your email inbox
2. Click the confirmation link
3. Then you can sign in

## Why This Happens

When email confirmation is enabled, Supabase creates the user but doesn't fully authenticate them until they confirm their email. This means when we try to create the profile, the `auth.uid()` function returns null, causing the RLS policy to reject the insert.

## Test It Now

1. Make sure email confirmation is disabled (see step above)
2. Refresh your browser at `http://localhost:5173`
3. Go to `/signup`
4. Create a new account
5. You should be redirected to the dashboard successfully!

## Verify It Worked

After signing up, check your Supabase dashboard:
- **Authentication** > **Users** - You should see your new user
- **Table Editor** > **profiles** - You should see your profile data
