import { useState, useEffect, useCallback } from 'react'
import { getCustomers } from '../services/customerService'

/**
 * Hook to fetch and refresh customer list.
 * @returns {{ customers: array, loading: boolean, error: string | null, refresh: function }}
 */
export function useCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await getCustomers()
    if (err) {
      setError(err.message || 'Failed to load customers')
      setCustomers([])
    } else {
      setCustomers(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { customers, loading, error, refresh }
}

/*
 * HOW useCustomers.js WORKS
 * -------------------------
 * This custom hook encapsulates all logic for loading and refreshing the customer list from Supabase.
 * Components use it instead of calling Supabase directly.
 *
 * STATE:
 *   - customers: array of customer objects from the DB (or [] on error).
 *   - loading: true while a request is in flight, false when done.
 *   - error: error message string if the fetch failed, null otherwise.
 *
 * refresh (useCallback):
 *   - Sets loading true and error null, then calls getCustomers() from the service.
 *   - On success: stores data in customers (or [] if data is null/undefined).
 *   - On failure: stores the error message and clears customers.
 *   - Then sets loading false. useCallback with [] deps means refresh is stable across renders.
 *
 * useEffect:
 *   - Runs once on mount (dependency [refresh] is stable), so it triggers the initial fetch.
 *
 * RETURN:
 *   - { customers, loading, error, refresh } so the page can show the list, a loading spinner, errors, and trigger a refetch after adding a customer.
 */
