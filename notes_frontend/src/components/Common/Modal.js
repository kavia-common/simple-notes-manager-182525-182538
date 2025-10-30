/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title = 'Confirm', children, onClose, actions = [] }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      const previouslyFocused = document.activeElement;
      dialogRef.current.focus();
      return () => {
        if (previouslyFocused && previouslyFocused.focus) {
          previouslyFocused.focus();
        }
      };
    }
    return undefined;
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modal-title" style={{ marginTop: 0 }}>{title}</h3>
        <div>{children}</div>
        <div className="modal-actions">
          {actions.map((a, i) => (
            <button
              key={i}
              className={`btn ${a.variant ? a.variant : ''}`}
              onClick={a.onClick}
              autoFocus={a.autoFocus}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
