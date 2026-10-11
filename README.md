# ShareShelf

**Share more. Learn more.** ShareShelf is a student-to-student resource-sharing marketplace for textbooks, study notes, exam preparation materials, and supplies.

## Current prototype

- Responsive marketplace UI designed for mobile and desktop
- Search by title, category, subject, or student name
- Filter by category and sharing type
- Save and unsave resources during the current session
- Create new demo listings
- Open resource details and try the request interaction
- Hybrid clean workspace design with a student-friendly green palette

> **Prototype status:** Listings are currently held in React state and use sample data. Refreshing the page resets changes. Requests, accounts, and persistent storage are not connected yet.

## Tech stack

- React 18
- Vite
- Tailwind CSS v4 tooling
- lucide-react icons

## Run locally

```bash
npm install
npm run dev
```

## Roadmap

1. Verify the UI and interactions in StackBlitz.
2. Connect the correct Supabase project and create a resources table.
3. Add authentication and Row Level Security policies.
4. Add image uploads and request tracking.
5. Test mobile layouts and deploy.

## Security

- Never commit `.env` or `.env.local`.
- Use only the Supabase publishable key in browser code with appropriate Row Level Security policies.
- Never expose a Supabase secret or service-role key in frontend code.
