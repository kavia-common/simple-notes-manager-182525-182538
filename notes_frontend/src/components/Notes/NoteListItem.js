/* eslint-disable react/prop-types */
// PUBLIC_INTERFACE
export default function NoteListItem({ note, active, onClick }) {
  const updated = new Date(note.updatedAt);
  const subtitle = `${updated.toLocaleDateString()} ${updated.toLocaleTimeString()}`;
  return (
    <button
      className={`note-list-item ${active ? 'active' : ''}`}
      role="listitem"
      onClick={onClick}
      aria-current={active ? 'true' : 'false'}
    >
      <div style={{ textAlign: 'left' }}>
        <div className="title">
          {note.pinned ? '📌 ' : ''}{note.title || 'Untitled'}
        </div>
        <div className="meta">{subtitle}</div>
      </div>
      <div className="meta" aria-hidden>
        {note.content ? `${note.content.slice(0, 20)}…` : ''}
      </div>
    </button>
  );
}
