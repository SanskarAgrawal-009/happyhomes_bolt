# Vercel Configuration Explained

This document explains the `vercel.json` configuration for the HappyHomes application.

## Overview

The `vercel.json` file configures how Vercel builds and serves your Single Page Application (SPA). Since React Router handles routing on the client side, we need to ensure all routes are rewritten to serve `index.html`.

## Configuration Sections

### Build Settings

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

- **buildCommand**: Command to build the production bundle
- **outputDirectory**: Where Vite outputs the built files
- **devCommand**: Command for local development (used in Vercel dev)
- **installCommand**: Command to install dependencies
- **framework**: Tells Vercel this is a Vite project

## Rewrites Configuration

### Why Rewrites Are Needed

In a SPA, the server needs to serve `index.html` for all routes so that React Router can handle the routing on the client side. Without rewrites, refreshing a page like `/dashboard/profile` would result in a 404 error.

### Route Categories

#### 1. **Public Pages** (No Authentication Required)

```json
{ "source": "/", "destination": "/index.html" }
{ "source": "/about", "destination": "/index.html" }
{ "source": "/contact", "destination": "/index.html" }
{ "source": "/signin", "destination": "/index.html" }
{ "source": "/signup", "destination": "/index.html" }
```

These are publicly accessible pages that don't require authentication.

#### 2. **Dashboard Base**

```json
{ "source": "/dashboard", "destination": "/index.html" }
```

The main dashboard landing page.

#### 3. **Common Dashboard Routes**

```json
{ "source": "/dashboard/profile", "destination": "/index.html" }
{ "source": "/dashboard/portfolio", "destination": "/index.html" }
{ "source": "/dashboard/post-project", "destination": "/index.html" }
{ "source": "/dashboard/chat", "destination": "/index.html" }
```

Routes available to all authenticated users.

#### 4. **Homeowner-Specific Routes**

```json
{ "source": "/dashboard/post-requirement", "destination": "/index.html" }
{ "source": "/dashboard/browse-designers", "destination": "/index.html" }
{ "source": "/dashboard/my-requirements", "destination": "/index.html" }
{ "source": "/dashboard/designer/:designerId", "destination": "/index.html" }
```

Routes specific to homeowner users. Note the dynamic route with `:designerId` parameter.

#### 5. **Designer-Specific Routes**

```json
{ "source": "/dashboard/browse-requirements", "destination": "/index.html" }
{ "source": "/dashboard/my-proposals", "destination": "/index.html" }
```

Routes specific to designer users.

#### 6. **Freelancer-Specific Routes**

```json
{ "source": "/dashboard/browse-jobs", "destination": "/index.html" }
{ "source": "/dashboard/my-applications", "destination": "/index.html" }
```

Routes specific to freelancer users.

#### 7. **Legacy Routes**

```json
{ "source": "/dashboard/projects", "destination": "/index.html" }
{ "source": "/dashboard/designers", "destination": "/index.html" }
{ "source": "/dashboard/freelancers", "destination": "/index.html" }
{ "source": "/dashboard/jobs", "destination": "/index.html" }
{ "source": "/dashboard/applications", "destination": "/index.html" }
```

Legacy routes that redirect to the main dashboard.

#### 8. **Catch-All Route**

```json
{ "source": "/:path*", "destination": "/index.html" }
```

This catches any other routes not explicitly defined above. It ensures that:
- Deep links work correctly
- Page refreshes don't cause 404 errors
- Future routes work without updating this config

## Headers Configuration

### Security Headers

```json
{
  "source": "/(.*)",
  "headers": [
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "X-XSS-Protection", "value": "1; mode=block" }
  ]
}
```

**Purpose**: Enhance security for all pages

- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking by disabling iframe embedding
- **X-XSS-Protection**: Enables browser XSS filtering

### Asset Caching

```json
{
  "source": "/assets/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
  ]
}
```

**Purpose**: Optimize performance for static assets

- **public**: Asset can be cached by CDN and browsers
- **max-age=31536000**: Cache for 1 year (31,536,000 seconds)
- **immutable**: Asset will never change (Vite uses content hashing)

## How It Works

1. **User visits a route** (e.g., `/dashboard/profile`)
2. **Vercel receives the request**
3. **Checks rewrite rules** in order from top to bottom
4. **Matches the route** to `/dashboard/profile` rewrite rule
5. **Serves `index.html`** from the `dist` folder
6. **React loads** and React Router takes over
7. **React Router** renders the Profile component
8. **Headers are applied** (security + caching if applicable)

## Dynamic Routes

The configuration includes support for dynamic routes:

```json
{ "source": "/dashboard/designer/:designerId", "destination": "/index.html" }
```

This allows URLs like:
- `/dashboard/designer/123`
- `/dashboard/designer/abc-def-456`
- `/dashboard/designer/any-valid-id`

React Router will extract the `designerId` parameter and use it to fetch the appropriate designer data.

## Testing Rewrites

After deployment, test these scenarios:

1. **Direct navigation**: Visit routes directly in browser
2. **Page refresh**: Refresh on any route
3. **Deep links**: Share and open deep links
4. **Dynamic routes**: Test with different designer IDs
5. **404 handling**: Visit non-existent routes (should redirect to `/`)

## Troubleshooting

### Issue: 404 on page refresh

**Solution**: Ensure `vercel.json` is in the root directory and properly formatted.

### Issue: Assets not loading

**Solution**: Check that asset paths in your code are relative (e.g., `/assets/image.png`).

### Issue: Dynamic routes not working

**Solution**: Verify the route pattern matches your React Router configuration.

### Issue: Headers not applied

**Solution**: Check the `source` pattern matches your routes. Use `/(.*)` for all routes.

## Adding New Routes

When you add new routes to your application:

1. **Add to `App.tsx`** - Define the route in React Router
2. **Update `vercel.json`** - Add explicit rewrite rule (optional, catch-all covers it)
3. **Test locally** - Use `npm run build && npm run preview`
4. **Deploy** - Push to trigger Vercel deployment

> **Note**: The catch-all rule `/:path*` means you don't strictly need to add every new route to `vercel.json`, but explicit rules are better for documentation and debugging.

## Performance Considerations

- **Explicit routes first**: More specific routes are listed before the catch-all
- **Asset caching**: Static assets cached for 1 year for optimal performance
- **Immutable assets**: Vite's content hashing ensures safe long-term caching
- **Security headers**: Minimal performance impact with significant security benefits

## References

- [Vercel Rewrites Documentation](https://vercel.com/docs/projects/project-configuration#rewrites)
- [Vercel Headers Documentation](https://vercel.com/docs/projects/project-configuration#headers)
- [React Router Documentation](https://reactrouter.com/)
