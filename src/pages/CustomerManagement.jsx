import { useState } from 'react'
import { insertCustomer } from '../services/customerService'
import { useCustomers } from '../hooks/useCustomers'
import { Alert } from '../components/Alert'

const initialForm = { name: '', email: '', country: '' }

function validateForm({ name, email, country }) {
  const errors = {}
  if (!name?.trim()) errors.name = 'Name is required'
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address'
  }
  if (!country?.trim()) errors.country = 'Country is required'
  return errors
}

export function CustomerManagement() {
  const { customers, loading, error, refresh } = useCustomers()
  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }))
    setSubmitError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm(form)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    setSubmitError(null)
    setSuccessMessage(null)
    setSubmitLoading(true)
    try {
      const { data, error: insertError } = await insertCustomer(form)
      if (insertError) throw insertError
      setForm(initialForm)
      setSuccessMessage('Customer added successfully.')
      await refresh()
    } catch (err) {
      setSubmitError(err.message || 'Failed to add customer.')
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Customer Management
          </h1>
          <p className="mt-1 text-slate-600">
            Add and view customers.
          </p>
        </header>

        {/* Form */}
        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            Add customer
          </h2>
          {successMessage && (
            <div className="mb-4">
              <Alert type="success" onDismiss={() => setSuccessMessage(null)}>
                {successMessage}
              </Alert>
            </div>
          )}
          {submitError && (
            <div className="mb-4">
              <Alert type="error" onDismiss={() => setSubmitError(null)}>
                {submitError}
              </Alert>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100"
                disabled={submitLoading}
                autoComplete="name"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100"
                disabled={submitLoading}
                autoComplete="email"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-700"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. United States"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100"
                disabled={submitLoading}
                autoComplete="country-name"
              />
              {fieldErrors.country && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.country}</p>
              )}
            </div>
            <div className="pt-1">
              <button
                type="submit"
                disabled={submitLoading}
                className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-60"
              >
                {submitLoading ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Adding…
                  </>
                ) : (
                  'Add customer'
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Table */}
        <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
          <div className="px-6 py-4 sm:px-8 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Customers
            </h2>
          </div>
          {error && (
            <div className="p-6 sm:p-8">
              <Alert type="error">{error}</Alert>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-sky-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600"
                    >
                      Country
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {customers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No customers yet. Add one using the form above.
                      </td>
                    </tr>
                  ) : (
                    customers.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                          {row.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          {row.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          {row.country}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
