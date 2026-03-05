import { supabase } from '../lib/supabaseClient'

const TABLE_NAME = 'customer'

function ensureClient() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. See .env.example.'
    )
  }
}

/**
 * Insert a new customer into the customer table.
 * @param {Object} customer - { name: string, email: string, country: string }
 * @returns {Promise<{ data: object | null, error: Error | null }>}
 */
export async function insertCustomer(customer) {
  ensureClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        name: customer.name.trim(),
        email: customer.email.trim(),
        country: customer.country.trim(),
      },
    ])
    .select()
    .single()

  return { data, error }
}

/**
 * Fetch all customers from the customer table.
 * @returns {Promise<{ data: array | null, error: Error | null }>}
 */
export async function getCustomers() {
  ensureClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

/*
 * HOW customerService.js WORKS
 * ----------------------------
 * Service layer for the "customer" table. All Supabase calls live here; components never import supabase directly.
 *
 * ensureClient():
 *   - Called at the start of insertCustomer and getCustomers. If supabase is null (env not set), throws a clear error so the UI can show a message instead of failing silently.
 *
 * insertCustomer(customer):
 *   - Expects { name, email, country }. Trims each value and inserts one row into the "customer" table.
 *   - .insert([{...}]).select().single() inserts and returns the created row (with id, created_at, etc. if your table has them).
 *   - Returns { data, error } like Supabase: data is the new row on success, error is set on failure.
 *
 * getCustomers():
 *   - Selects all columns from "customer", ordered by created_at descending (newest first).
 *   - Returns { data, error }; data is an array of rows (or null), error is set if the request fails.
 *
 * Components use these two functions and handle loading/error/success in the UI; they never touch supabase or table names.
 */
