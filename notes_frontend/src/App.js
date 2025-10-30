import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import './styles/theme.css';
import './App.css';
import Sidebar from './components/Layout/Sidebar';
import MainPane from './components/Layout/MainPane';
import { notesRepository } from './data/notesRepository';
import { createId } from './utils/id';

// PUBLIC_INTERFACE
function App() {
  /**
   * Notes app state:
   * - notes: array of Note objects
   * - selectedNoteId: currently active note id
   * - searchQuery: current search text for filtering
   */
  const [notes, setNotes] = useState(() => notesRepository.list());
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');

  const firstTitleRef = useRef(null);

  // Apply theme for Ocean Professional variables scope if needed later
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist notes to repository when notes array changes
  useEffect(() => {
    notesRepository.overwrite(notes);
  }, [notes]);

  // Derived: filtered and sorted notes
  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const base = q ? notesRepository.search(q, notes) : notes;
    // Sort: pinned first then updatedAt desc
    const sorted = [...base].sort((a, b) => {
      if ((b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) !== 0) {
        return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return sorted;
  }, [notes, searchQuery]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleCreateNote = useCallback(() => {
    const id = createId();
    const now = new Date().toISOString();
    const newNote = {
      id,
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(id);
    // Focus title on next tick
    setTimeout(() => {
      if (firstTitleRef.current) {
        firstTitleRef.current.focus();
      }
    }, 0);
  }, []);

  // PUBLIC_INTERFACE
  const handleUpdateNote = useCallback((id, patch) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n
      )
    );
  }, []);

  // PUBLIC_INTERFACE
  const handleDeleteNote = useCallback(id => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  }, [selectedNoteId]);

  // PUBLIC_INTERFACE
  const handleClearAll = useCallback(() => {
    setNotes([]);
    setSelectedNoteId(null);
  }, []);

  // PUBLIC_INTERFACE
  const handleTogglePin = useCallback(id => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, pinned: !n.pinned, updatedAt: new Date().toISOString() } : n
      )
    );
  }, []);

  // PUBLIC_INTERFACE
  const handleSelectNote = useCallback(id => {
    setSelectedNoteId(id);
  }, []);

  // PUBLIC_INTERFACE
  const handleSearch = useCallback(value => {
    setSearchQuery(value);
  }, []);

  return (
    <div className="notes-app">
      <aside className="sidebar" aria-label="Notes sidebar">
        <Sidebar
          theme={theme}
          onToggleTheme={toggleTheme}
          notes={filteredNotes}
          selectedId={selectedNoteId}
          onSelect={handleSelectNote}
          onCreate={handleCreateNote}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onClearAll={handleClearAll}
        />
      </aside>
      <main className="main-pane" aria-label="Note editor area">
        <MainPane
          note={selectedNote}
          onChange={handleUpdateNote}
          onDelete={handleDeleteNote}
          onTogglePin={handleTogglePin}
          titleRef={firstTitleRef}
        />
      </main>
    </div>
  );
}

export default App;
