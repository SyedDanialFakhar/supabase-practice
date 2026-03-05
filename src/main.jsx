import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/*
 * HOW main.jsx WORKS
 * ------------------
 * This is the JavaScript entry point. index.html has <div id="root"> and a script that loads this file.
 *
 * createRoot(document.getElementById('root')):
 *   - React 18 API. Gets the DOM node where the app will live and creates a root. All React components are rendered inside this root.
 *
 * .render(...):
 *   - Renders the tree you pass (here: StrictMode wrapping App) into that root. The browser paints whatever App (and its children) return.
 *
 * StrictMode:
 *   - A React wrapper that in development helps find side effects and deprecated patterns; it does not change behaviour in production. Your app is effectively: <App />, which loads CustomerManagement and the rest of the UI.
 */
