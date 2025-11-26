# Pre-Deployment Checklist

Use this checklist before deploying to ensure everything is configured correctly.

## ✅ Supabase Configuration

- [ ] Supabase project created
- [ ] SQL migrations executed (see `DATABASE_SETUP.md`)
- [ ] Storage buckets created:
  - [ ] `avatars` bucket (public)
  - [ ] `portfolios` bucket (public)
- [ ] Storage policies configured for both buckets
- [ ] Supabase URL and Anon Key copied

## ✅ Local Testing

- [ ] `.env` file created with Supabase credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Development server runs (`npm run dev`)
- [ ] User registration works
- [ ] User login works
- [ ] File uploads work (avatars, portfolios)
- [ ] Build succeeds (`npm run build`)

## ✅ Code Repository

- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` file is NOT committed (check `.gitignore`)
- [ ] All changes committed
- [ ] Repository is accessible

## ✅ Vercel Deployment

- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added in Vercel:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Build settings verified:
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] First deployment successful

## ✅ Post-Deployment

- [ ] Deployment URL accessible
- [ ] Supabase redirect URLs updated:
  - [ ] Site URL: `https://your-app.vercel.app`
  - [ ] Redirect URLs: `https://your-app.vercel.app/**`
- [ ] Test user registration on production
- [ ] Test user login on production
- [ ] Test file uploads on production
- [ ] Test all major features

## ✅ Optional Enhancements

- [ ] Custom domain configured
- [ ] Analytics enabled in Vercel
- [ ] Error monitoring set up
- [ ] Performance monitoring enabled

## 🚨 Common Issues

### Build Fails
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are in `package.json`

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding variables
- Check they're set for all environments

### Authentication Fails
- Verify Supabase redirect URLs include your Vercel domain
- Check environment variables are correct
- Ensure RLS policies are properly set

### 404 on Routes
- Verify `vercel.json` exists with rewrite rules
- Check React Router configuration

## 📝 Notes

- Vercel automatically deploys on every push to main branch
- Preview deployments are created for pull requests
- Environment variables need to be set separately for each environment
- Always test in preview before merging to production
