import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase env: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (see .env.example).'
  )
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

/*
 * HOW supabaseClient.js WORKS
 * ---------------------------
 * This file creates the single Supabase client instance used by the whole app.
 *
 * ENV VARS (Vite exposes only VITE_* to the client):
 *   - VITE_SUPABASE_URL: your project URL (e.g. https://xxxx.supabase.co).
 *   - VITE_SUPABASE_ANON_KEY: the public "anon" key from Supabase dashboard (safe for browser use with RLS).
 *
 * LOGIC:
 *   - import.meta.env is Vite’s way to read env at build time; we read the two variables once when the module loads.
 *   - If either is missing, we log a warning (no throw), so the app still builds and runs; the service layer will throw a clear error when someone tries to use Supabase.
 *   - If both exist, we call createClient(url, key) and export that client; otherwise we export null.
 *
 * USAGE:
 *   - Other modules (e.g. customerService.js) import { supabase } from here and use supabase.from('table')... for all DB calls. Keys are never hardcoded.
 */
