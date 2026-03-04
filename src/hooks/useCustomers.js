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
