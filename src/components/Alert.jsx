/**
 * Reusable alert for success and error messages.
 */
export function Alert({ type = 'info', children, onDismiss }) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
  }
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${styles[type]}`}
      role="alert"
    >
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-1 hover:opacity-80"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  )
}

/*
 * HOW Alert.jsx WORKS
 * ------------------
 * This is a presentational component that shows a message box (success, error, or info).
 *
 * PROPS:
 *   - type: 'success' | 'error' | 'info' — controls background and text color via the styles object.
 *   - children: the message text (or any React node) to display inside the alert.
 *   - onDismiss: optional function; when provided, a "×" button is shown and clicking it calls onDismiss (e.g. to hide the alert).
 *
 * BEHAVIOUR:
 *   - The component picks a CSS class string from styles[type] and applies it to the outer div, so the alert looks different for success (green), error (red), or info (blue).
 *   - role="alert" tells assistive technologies that this is an alert message.
 *   - The dismiss button only renders when onDismiss is passed; clicking it lets the parent clear the message state.
 */
