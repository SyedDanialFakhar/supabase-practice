# Supabase Practice – Customer Management

A modern React frontend (Vite + JavaScript) with Supabase for customer management: add customers and view them in a table.

## Setup

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Supabase**
   - Create a project at [supabase.com](https://supabase.com).
   - In **Table Editor**, create a table named `customer` with columns:
     - `id` – uuid, primary key, default: `gen_random_uuid()`
     - `name` – text, not null
     - `email` – text, not null
     - `country` – text, not null
     - `created_at` – timestamptz, default: `now()`
   - In **Settings → API** copy the project URL and anon (public) key.

3. **Environment**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Set in `.env`:
     - `VITE_SUPABASE_URL` – your project URL  
     - `VITE_SUPABASE_ANON_KEY` – your anon key  

4. **Run**
   ```bash
   npm run dev
   ```
   Open the URL shown (e.g. http://localhost:5173).

## Scripts

- `npm run dev` – start dev server  
- `npm run build` – production build  
- `npm run preview` – preview production build  

## Structure

```
src/
  components/   # Reusable UI (e.g. Alert)
  pages/        # Page components (CustomerManagement)
  services/     # API / Supabase (customerService)
  hooks/        # Custom hooks (useCustomers)
  lib/          # Supabase client config
  styles/       # Global CSS (Tailwind)
```

## Tech

- **Vite** – build and dev server  
- **React 18** – UI  
- **Tailwind CSS** – styling  
- **Supabase** – backend (table `customer`)  

No Supabase keys are hardcoded; they are read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`.
