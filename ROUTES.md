# Application Routes Reference

Complete list of all routes in the HappyHomes application.

## Public Routes (No Authentication Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | Home page with hero section and features |
| `/about` | About | About the platform and team |
| `/contact` | Contact | Contact form for inquiries |
| `/signin` | SignIn | User login page |
| `/signup` | SignUp | User registration page |

## Protected Routes (Authentication Required)

All routes under `/dashboard` require authentication via `ProtectedRoute` component.

### Common Dashboard Routes

| Route | Component | Description | Available To |
|-------|-----------|-------------|--------------|
| `/dashboard` | Dashboard | Main dashboard (role-specific) | All users |
| `/dashboard/profile` | Profile | User profile management | All users |
| `/dashboard/portfolio` | Portfolio | Portfolio management | All users |
| `/dashboard/post-project` | PostProject | Post a new project | All users |
| `/dashboard/chat` | Chat | Messaging system | All users |

### Homeowner Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/post-requirement` | PostRequirement | Post interior design requirements |
| `/dashboard/browse-designers` | BrowseDesigners | Browse available designers |
| `/dashboard/my-requirements` | MyRequirements | View posted requirements |
| `/dashboard/designer/:designerId` | DesignerProfile | View specific designer profile |

**Dynamic Route Example:**
- `/dashboard/designer/abc123` - View designer with ID "abc123"
- `/dashboard/designer/xyz789` - View designer with ID "xyz789"

### Designer Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/browse-requirements` | BrowseRequirements | Browse homeowner requirements |
| `/dashboard/my-proposals` | MyProposals | View submitted proposals |

### Freelancer Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/browse-jobs` | BrowseJobs | Browse available jobs |
| `/dashboard/my-applications` | MyApplications | View job applications |

### Legacy Routes

These routes redirect to the main dashboard:

| Route | Redirects To |
|-------|--------------|
| `/dashboard/projects` | Dashboard |
| `/dashboard/designers` | Dashboard |
| `/dashboard/freelancers` | Dashboard |
| `/dashboard/jobs` | Dashboard |
| `/dashboard/applications` | Dashboard |

## Route Protection

Routes are protected using the `ProtectedRoute` component which:
1. Checks if user is authenticated via Supabase
2. Redirects to `/signin` if not authenticated
3. Allows access if authenticated

## Navigation Flow

### New User Journey
```
/ (Landing) → /signup → /signin → /dashboard → Role-specific routes
```

### Returning User Journey
```
/ (Landing) → /signin → /dashboard → Role-specific routes
```

### Homeowner Flow
```
/dashboard → /dashboard/post-requirement → /dashboard/browse-designers → 
/dashboard/designer/:id → /dashboard/chat
```

### Designer Flow
```
/dashboard → /dashboard/browse-requirements → /dashboard/my-proposals → 
/dashboard/chat
```

### Freelancer Flow
```
/dashboard → /dashboard/browse-jobs → /dashboard/my-applications → 
/dashboard/chat
```

## Route Parameters

### Dynamic Parameters

- **`:designerId`** - UUID or string identifier for a designer
  - Used in: `/dashboard/designer/:designerId`
  - Example: `/dashboard/designer/550e8400-e29b-41d4-a716-446655440000`

## URL Structure Best Practices

### Current Structure
```
/dashboard/[feature-name]
/dashboard/[role]/[feature-name]  (for role-specific features)
```

### Examples
- ✅ `/dashboard/profile` - Common feature
- ✅ `/dashboard/browse-designers` - Homeowner feature
- ✅ `/dashboard/browse-requirements` - Designer feature
- ✅ `/dashboard/designer/123` - Dynamic route

## Adding New Routes

To add a new route:

1. **Create the component** in `src/pages/` or appropriate subdirectory
2. **Import in App.tsx**
   ```tsx
   import NewPage from './pages/NewPage';
   ```
3. **Add route definition**
   ```tsx
   <Route path="new-page" element={<NewPage />} />
   ```
4. **Update vercel.json** (optional, catch-all covers it)
   ```json
   { "source": "/dashboard/new-page", "destination": "/index.html" }
   ```
5. **Update this documentation**

## Route Testing Checklist

When testing routes, verify:

- [ ] Direct navigation works (typing URL in browser)
- [ ] Navigation via links works
- [ ] Page refresh maintains route
- [ ] Back/forward buttons work correctly
- [ ] Protected routes redirect when not authenticated
- [ ] Dynamic routes work with different parameters
- [ ] 404 handling for invalid routes

## SEO Considerations

### Public Routes
- Should have proper meta tags
- Should be indexable by search engines
- Should have descriptive titles

### Protected Routes
- Should have `noindex` meta tag
- Should not be accessible to search engines
- Should redirect unauthenticated users

## Mobile Deep Linking

If implementing mobile apps, these routes can be used as deep links:

```
happyhomes://dashboard/profile
happyhomes://dashboard/designer/123
happyhomes://signin
```

## Analytics Tracking

Recommended events to track:

- Page views on all routes
- Conversion funnels:
  - Landing → Signup → Dashboard
  - Browse Designers → Designer Profile → Chat
  - Browse Requirements → Proposal → Chat

## Related Files

- `src/App.tsx` - Route definitions
- `vercel.json` - Vercel rewrite rules
- `src/components/ProtectedRoute.tsx` - Authentication guard
- `src/components/Layout.tsx` - Public pages layout
- `src/components/DashboardLayout.tsx` - Dashboard layout
