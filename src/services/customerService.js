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
