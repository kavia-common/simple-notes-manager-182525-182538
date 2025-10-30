/* eslint-disable react/prop-types */
import NoteListItem from './NoteListItem';

// PUBLIC_INTERFACE
export default function NoteList({ notes, selectedId, onSelect }) {
  return (
    <div className="note-list" role="list" aria-label="Notes list">
      {notes.map(n => (
        <NoteListItem
          key={n.id}
          note={n}
          active={n.id === selectedId}
          onClick={() => onSelect(n.id)}
        />
      ))}
      {notes.length === 0 && (
        <div className="note-list-item" aria-live="polite">
          <div>
            <div className="title">No notes found</div>
            <div className="meta">Create a new note to get started.</div>
          </div>
        </div>
      )}
    </div>
  );
}
