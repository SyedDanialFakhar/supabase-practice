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
