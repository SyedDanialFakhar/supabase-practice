# Supabase Practice – Customer Management

A modern React frontend (Vite + JavaScript) with Supabase for customer management and **email/password + Google OAuth**: sign up/sign in with email or “Continue with Google”; only logged-in users can add/view customers.

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
   - **Google OAuth**: In **Authentication → Providers** enable **Google**, set your Client ID and Secret (from Google Cloud Console). Then go to **Authentication → URL Configuration** and set **Site URL** to your app origin (e.g. `http://localhost:5173` for dev). Add the same URL to **Redirect URLs** (e.g. `http://localhost:5173/**`). For production, add your production origin to both.

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
   - Open the URL shown (e.g. http://localhost:5173). You’ll be redirected to **/login** until you sign in. Use **Sign up** or **Sign in** with email/password, or click **Continue with Google**. After login you’ll see the Customer Management page and a **Log out** button.

## Google OAuth – testing

1. **Supabase Dashboard**
   - **Authentication → URL Configuration**: **Site URL** = `http://localhost:5173`, **Redirect URLs** = `http://localhost:5173/**` (for production add your live URL).
   - **Authentication → Providers → Google**: enabled with valid Client ID and Secret.

2. **In the app**
   - Go to **/login** or **/signup**.
   - Click **Continue with Google** → you’re sent to Google; after signing in, Supabase redirects back to `/` and you see Customer Management.
   - If you’re already logged in (email or Google), opening **/login** or **/signup** redirects you to `/` automatically.
   - Use **Log out** in the header to sign out and return to login.

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
