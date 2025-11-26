# HappyHomes - Interior Design Platform

A modern interior design platform connecting homeowners with professional designers.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- A Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd happyhomes_bolt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Follow the instructions in `DATABASE_SETUP.md` to:
   - Run SQL migrations
   - Create storage buckets
   - Set up storage policies

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Deployment

### Deploy to Vercel

See detailed instructions in `DEPLOYMENT.md`.

**Quick Deploy:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Backend**: Supabase (Auth, Database, Storage)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
happyhomes_bolt/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── store/          # Redux store and slices
│   ├── lib/            # Utility functions and configs
│   ├── hooks/          # Custom React hooks
│   └── App.tsx         # Main app component
├── supabase/
│   └── migrations/     # Database migrations
├── public/             # Static assets
├── .env.example        # Environment variables template
├── DATABASE_SETUP.md   # Database setup guide
├── DEPLOYMENT.md       # Deployment guide
└── vercel.json         # Vercel configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## 📚 Documentation

- [Database Setup](DATABASE_SETUP.md) - Complete database setup instructions
- [Deployment Guide](DEPLOYMENT.md) - Step-by-step deployment guide
- [RLS Fix](RLS_FIX.md) - Row Level Security troubleshooting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions:
- Check `DATABASE_SETUP.md` for database issues
- Check `DEPLOYMENT.md` for deployment issues
- Check `RLS_FIX.md` for authentication/permission issues
