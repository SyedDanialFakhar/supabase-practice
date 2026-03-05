import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { CustomerManagement } from './pages/CustomerManagement'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import './styles/index.css'

function ProtectedLayout() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            {user?.email}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Log out
          </button>
        </div>
      </div>
      <CustomerManagement />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

/*
 * HOW App.jsx WORKS
 * -----------------
 * App is the root component rendered by main.jsx. It:
 *   1. Wraps the app in AuthProvider so any component can use useAuth() for user/session and signIn, signUp, signOut.
 *   2. Uses BrowserRouter and Routes: /login (Login), /signup (Signup), / (protected). ProtectedRoute redirects to /login when not authenticated; when authenticated it renders ProtectedLayout.
 *   3. ProtectedLayout shows the current user email, a Log out button (which calls signOut and redirects to /login), and the CustomerManagement page below.
 *   4. Global styles are imported from styles/index.css. Any unmatched path redirects to /.
 */
