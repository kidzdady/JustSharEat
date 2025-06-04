import React from 'react';

// Placeholder Icons for different toast types
const InfoIcon = () => <span className="text-xl">ℹ️</span>;
const SuccessIcon = () => <span className="text-xl">✅</span>;
const WarningIcon = () => <span className="text-xl">⚠️</span>;
const ErrorIcon = () => <span className="text-xl">❌</span>;

export interface ToastProps {
  id?: string; // For managing multiple toasts
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode; // e.g., an "Undo" button
  onClose?: (id?: string) => void;
  className?: string;
  // Duration, position, etc., would be handled by a toast system provider
}

const Toast: React.FC<ToastProps> = ({
  id,
  variant = 'default',
  title,
  description,
  action,
  onClose,
  className,
}) => {
  const baseStyles =
    'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-surface shadow-lg ring-1 ring-black ring-opacity-5';
  
  const variantStyles = {
    default: 'border-border', // Default border or specific style
    info: 'border-blue-500 bg-blue-50 text-blue-700',
    success: 'border-green-500 bg-green-50 text-green-700',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-700',
    error: 'border-red-500 bg-red-50 text-red-700',
  };

  const Icon = () => {
    switch (variant) {
      case 'info': return <InfoIcon />;
      case 'success': return <SuccessIcon />;
      case 'warning': return <WarningIcon />;
      case 'error': return <ErrorIcon />;
      default: return null; // Or a default icon
    }
  };

  return (
    <div
      className={[baseStyles, variantStyles[variant], className]
        .filter(Boolean)
        .join(' ')}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Icon />
          </div>
          <div className="ml-3 w-0 flex-1">
            {title && (
              <p className={`text-sm font-medium ${variant === 'default' ? 'text-text-primary' : ''}`}>
                {title}
              </p>
            )}
            {description && (
              <p className={`mt-1 text-sm ${variant === 'default' ? 'text-text-secondary' : ''}`}>
                {description}
              </p>
            )}
            {action && <div className="mt-3 flex space-x-3">{action}</div>}
          </div>
          {onClose && (
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md bg-transparent text-current hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => onClose(id)}
              >
                <span className="sr-only">Close</span>
                {/* X Icon for close */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Toast.displayName = 'Toast';

// To use toasts effectively, you'd typically have a ToastProvider and a hook like useToast()
// Example (conceptual, not fully implemented here):
//
// export const ToastProvider = ({ children }) => {
//   const [toasts, setToasts] = useState([]);
//   // Logic to add, remove, auto-dismiss toasts
//   return (
//     <>
//       {children}
//       <div className="fixed top-0 right-0 p-4 space-y-2 z-[100]">
//         {toasts.map(toast => <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />)}
//       </div>
//     </>
//   );
// };
//
// export const useToast = () => {
//   // return { toast: (options) => addToast(options) }
// };

export { Toast };