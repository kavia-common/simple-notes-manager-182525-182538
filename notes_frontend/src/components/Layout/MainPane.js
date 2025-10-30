/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import NoteEditor from '../Notes/NoteEditor';
import EmptyState from '../Notes/EmptyState';

// PUBLIC_INTERFACE
export default function MainPane({ note, onChange, onDelete, onTogglePin, titleRef }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!note) {
    return <EmptyState />;
  }

  return (
    <div className="editor-card" aria-live="polite">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="editor-actions">
          <Button variant="secondary" onClick={() => onTogglePin(note.id)} aria-label="Toggle pin">
            {note.pinned ? '📌 Unpin' : '📌 Pin'}
          </Button>
        </div>
        <div className="editor-actions">
          <Button variant="danger" onClick={() => setConfirmOpen(true)} aria-label="Delete note">Delete</Button>
        </div>
      </div>
      <NoteEditor
        note={note}
        onChange={(patch) => onChange(note.id, patch)}
        titleRef={titleRef}
      />
      <Modal
        open={confirmOpen}
        title="Delete note?"
        onClose={() => setConfirmOpen(false)}
        actions={[
          { label: 'Cancel', variant: 'secondary', onClick: () => setConfirmOpen(false) },
          { label: 'Delete', variant: 'danger', onClick: () => { onDelete(note.id); setConfirmOpen(false); }, autoFocus: true }
        ]}
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
