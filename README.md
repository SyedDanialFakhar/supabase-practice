# Supabase Practice – Customer Management

A modern React frontend (Vite + JavaScript) with Supabase for customer management and **email/password authentication**: sign up, sign in, and only logged-in users can add/view customers.

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
   - **Authentication**: In **Authentication → Providers**, ensure **Email** is enabled (default). Optionally turn off “Confirm email” for quicker local testing.

3. **Environment**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Set in `.env`:
     - `VITE_SUPABASE_URL` – your project URL  
     - `VITE_SUPABASE_ANON_KEY` – your anon key  

4. **Run the auth SQL (required for protected customer table)**
   - In Supabase Dashboard go to **SQL Editor**.
   - Open `supabase-auth.sql` in this repo and run the **RLS section** (the part that enables RLS on `customer` and creates policies for `authenticated` users). If you don’t have the `customer` table yet, run the “If you never created the customer table” block instead.

5. **Run the app**
   ```bash
   npm run dev
   ```
   - Open the URL shown (e.g. http://localhost:5173). You’ll be redirected to **/login** until you sign in. Use **Sign up** to create an account, then sign in. After login you’ll see the Customer Management page and a **Log out** button.

## Scripts

- `npm run dev` – start dev server  
- `npm run build` – production build  
- `npm run preview` – preview production build  

## Structure

```
src/
  components/   # Reusable UI (Alert, ProtectedRoute)
  contexts/     # Auth state (AuthContext)
  pages/        # Login, Signup, CustomerManagement
  services/     # API / Supabase (customerService)
  hooks/        # Custom hooks (useCustomers)
  lib/          # Supabase client config
  styles/       # Global CSS (Tailwind)
```

## Tech

- **Vite** – build and dev server  
- **React 18** – UI  
- **React Router** – routes (login, signup, protected home)  
- **Tailwind CSS** – styling  
- **Supabase** – backend (auth + table `customer`)  

No Supabase keys are hardcoded; they are read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`.
