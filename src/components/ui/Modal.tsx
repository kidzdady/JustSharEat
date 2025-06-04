import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string; // For styling the modal content area
  dialogClassName?: string; // For styling the dialog container
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  dialogClassName,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose} // Close on overlay click
    >
      <div
        className={['relative w-full max-w-lg rounded-lg bg-surface p-6 shadow-xl', dialogClassName].filter(Boolean).join(' ')}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {title && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold font-display text-text-primary">{title}</h3>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          {/* Simple X icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
export type { ModalProps };