# Stellaar Project Guide

## Overview
Stellaar is an advanced promotional showcase website designed to feature high-quality posters. It uses a modern tech stack to provide a premium, interactive user experience.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **Animations:** Framer Motion
- **Database:** Supabase
- **Language:** TypeScript

## Getting Started

### Prerequisites
- Node.js installed
- Supabase account and project setup

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Development
```bash
npm run dev
```

## Project Structure
- `/src/app`: Page routes and layouts
- `/src/components`: UI components
- `/public/assets`: Visual assets (Posters)
- `/src/lib`: Supabase client and utilities
