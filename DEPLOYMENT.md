# Deployment Guide

This guide will help you deploy the HappyHomes application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) project set up (see `DATABASE_SETUP.md`)
- Your Supabase credentials ready

## Deployment Steps

### 1. Prepare Your Supabase Backend

Before deploying to Vercel, ensure your Supabase project is fully configured:

1. ✅ Complete all steps in `DATABASE_SETUP.md`
2. ✅ Run the SQL migrations in Supabase SQL Editor
3. ✅ Create storage buckets (`avatars` and `portfolios`)
4. ✅ Set up storage policies
5. ✅ Note down your Supabase URL and Anon Key

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? `happyhomes` (or your preferred name)
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

5. **Add Environment Variables**:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```
   
   When prompted, paste your Supabase URL and Anon Key for each variable.
   Select **Production**, **Preview**, and **Development** for all environments.

6. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

#### Option B: Deploy via Vercel Dashboard

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your GitHub repository**

5. **Configure Project**:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
   
   Make sure to check all environments (Production, Preview, Development)

7. **Click "Deploy"**

### 3. Post-Deployment Configuration

#### Update Supabase Authentication Settings

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **URL Configuration**
3. Add your Vercel deployment URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: Add `https://your-app.vercel.app/**`

#### Test Your Deployment

1. Visit your deployed URL
2. Test user registration and login
3. Test file uploads (avatars, portfolios)
4. Test all major features

### 4. Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch (Production)
- Create preview deployments for pull requests
- Run build checks before deploying

## Environment Variables Reference

Your application requires these environment variables:

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard > Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase Dashboard > Settings > API |

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run typecheck`
- Check build logs in Vercel dashboard

### Environment Variables Not Working

- Ensure variables start with `VITE_` prefix
- Redeploy after adding environment variables
- Check that variables are set for the correct environment

### 404 Errors on Routes

- Verify `vercel.json` has the correct rewrite rules
- Check that React Router is properly configured

### Authentication Issues

- Verify Supabase URL configuration includes your Vercel domain
- Check that environment variables are correctly set
- Ensure RLS policies are properly configured in Supabase

### Storage/Upload Issues

- Verify storage buckets are created and set to public
- Check storage policies in Supabase
- Ensure CORS is configured in Supabase if needed

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** > **Domains**
3. Add your custom domain
4. Update DNS records as instructed
5. Update Supabase redirect URLs with your custom domain

## Monitoring and Analytics

Vercel provides built-in analytics:
- Go to your project dashboard
- Click on **Analytics** tab
- Monitor performance, traffic, and errors

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Supabase Documentation](https://supabase.com/docs)
