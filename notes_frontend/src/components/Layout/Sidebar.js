/* eslint-disable react/prop-types */
import Button from '../Common/Button';
import SearchBar from '../Common/SearchBar';
import NoteList from '../Notes/NoteList';

// PUBLIC_INTERFACE
export default function Sidebar({
  theme,
  onToggleTheme,
  notes,
  selectedId,
  onSelect,
  onCreate,
  searchQuery,
  onSearch,
  onClearAll
}) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 12, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <Button onClick={onCreate} aria-label="Create new note">+ New Note</Button>
        <Button variant="secondary" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>
      <SearchBar value={searchQuery} onChange={onSearch} />
      <NoteList
        notes={notes}
        selectedId={selectedId}
        onSelect={onSelect}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <small aria-live="polite" aria-atomic="true">{notes.length} notes</small>
        <Button variant="secondary" onClick={onClearAll} aria-label="Clear all notes">Clear All</Button>
      </div>
    </div>
  );
}
