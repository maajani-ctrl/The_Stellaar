# Project Summary: The Stellaar Club

## Overview
**The Stellaar Club** is a premium family club located in Nagpur, Maharashtra. It represents a modern lifestyle upgrade, rebranded and enhanced to offer an elite destination for families, professionals, and entrepreneurs in the heart of Nagpur.

## Core Identity
- **Tagline:** Luxury Redefined
- **Mission:** To provide a sanctuary where wellness, community, luxury, and exclusive experiences meet.
- **Location:** Ajni, Nagpur, Maharashtra 440015, India.

## Key Amenities & Features
The club offers a wide range of world-class facilities:
- **Swimming Pool:** Pristine waters for relaxation and fitness (Currently Open).
- **Modern Gymnasium:** State-of-the-art equipment and professional training (Currently Open).
- **Rooftop Restaurant:** Fine dining with panoramic views (Coming Soon).
- **Luxury Salon:** Refined grooming and beauty services (Currently Upgrading).
- **Elite Café:** Networking space with premium brews (Coming Soon).
- **Membership Concierge:** Dedicated team for seamless club experiences (Currently Open).

## Technical Architecture
The website is built using a modern, high-performance tech stack:
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Frontend Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/Database:** 
  - **Local SQL:** SQLite via `better-sqlite3` (for local lead persistence).
  - **Local Excel:** CSV-based logging for easy manual exports.
  - **Cloud (Planned):** [Supabase](https://supabase.com/) and [Google Sheets API](https://developers.google.com/sheets/api).
- **Language:** TypeScript

## Data Pipeline
1. **User Submission:** Form data is sent to `/api/submit-lead`.
2. **Local Persistence:** Data is stored in `data/leads.db` (SQLite) and `data/leads.csv`.
3. **Immediate Conversion:** User is redirected to WhatsApp with a pre-filled message containing their details for instant follow-up.

## Project Structure
- `src/app/`: Main layout, home page, and API routes.
- `src/components/`: Modular UI components:
  - `Hero.tsx`: Cinematic landing section with video background.
  - `About.tsx`: Vision and legacy details.
  - `Gallery.tsx`: Showcase of club amenities.
  - `Newsletter.tsx`: Membership tier selection and lead form.
  - `Affiliation.tsx`: Partner club details.
- `src/lib/`: Abstraction for database, Excel, and Google Sheets logic.
- `public/assets/`: Static media assets (videos, images, PDF brochures).
- `data/`: Local storage for SQLite and CSV files.

## Contact Information
- **Member Inquiries:** +91 8668647116
- **Support:** +91 7888005995
- **Social Media:** [Instagram](https://www.instagram.com/thestellaarnagpur)
- **WhatsApp:** [Direct Link](https://wa.me/917888005995)

---
*Last Updated: June 2, 2026*
