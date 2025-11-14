# Toplix Property Listings

A modern property listing application built with Next.js, Strapi, and Supabase.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Strapi CMS (local development)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (frontend), Railway/Render (optional for Strapi)

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Git
- GitHub account
- Vercel account

### Quick Start

1. **Local Development Setup**: See [LOCAL_SETUP.md](./LOCAL_SETUP.md) for team workflow with local Strapi

2. **Complete Tutorial**: See [TUTORIAL.md](./TUTORIAL.md) for step-by-step instructions

3. **Track your progress**: See [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

### Installation Steps (Summary)

1. Install Next.js with TypeScript and Tailwind
2. Set up shadcn/ui components
3. Create Supabase project and get database credentials
4. Install and configure Strapi in `/strapi` directory
5. Connect Strapi to Supabase database
6. Create Property content type in Strapi
7. Build frontend components
8. Deploy to GitHub and Vercel

### Local Development

```bash
# Install dependencies
npm install

# Run Next.js frontend
npm run dev

# In another terminal, run Strapi backend
cd strapi
npm install
npm run develop
```

Visit:
- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

**Note**: Get your Mapbox token from [mapbox.com](https://account.mapbox.com/access-tokens/)

For Strapi, copy `strapi/.env.example` to `strapi/.env` and configure your Supabase database connection.

## Project Structure

```
toplix-new/
├── app/                    # Next.js app directory
├── components/             # React components (shadcn/ui + custom)
├── lib/                    # Utility functions
├── strapi/                 # Strapi CMS backend
│   ├── config/            # Strapi configuration
│   ├── src/               # Strapi source code
│   └── .env               # Strapi environment variables
├── TUTORIAL.md            # Complete setup tutorial
└── SETUP_CHECKLIST.md     # Progress checklist
```

## Features

- ✅ Property listings with images
- ✅ Property detail pages
- ✅ Interactive Mapbox map on Buy/Rent pages
- ✅ Property markers with popups
- ✅ Click property cards to highlight on map
- ✅ Responsive design
- ✅ CMS-powered content management
- ✅ PostgreSQL database via Supabase

## Deployment

This project is designed to be deployed on:
- **Frontend**: Vercel (Next.js)
- **Backend**: Railway or Render (optional - for production Strapi)
- **Database**: Supabase (PostgreSQL)

**Note**: For development, Strapi runs locally. For production, you can deploy Strapi to Railway/Render or keep it local with a tunnel service.

See [TUTORIAL.md](./TUTORIAL.md) Step 11 for detailed deployment instructions.

## Documentation

- [Full Tutorial](./TUTORIAL.md) - Complete step-by-step guide
- [Setup Checklist](./SETUP_CHECKLIST.md) - Track your progress
- [Next.js Docs](https://nextjs.org/docs)
- [Strapi Docs](https://docs.strapi.io)
- [Supabase Docs](https://supabase.com/docs)

## License

MIT

