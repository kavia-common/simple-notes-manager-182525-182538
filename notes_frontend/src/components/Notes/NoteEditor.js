/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef } from 'react';

// Simple debounce hook local to file
function useDebouncedCallback(cb, delay) {
  const timer = useRef(null);
  return useMemo(() => {
    return (...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => cb(...args), delay);
    };
  }, [cb, delay]);
}

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, titleRef }) {
  const debouncedChange = useDebouncedCallback(onChange, 300);

  // Always create a local ref; use the provided one if passed for the actual input element
  const internalTitleRef = useRef(null);
  const effectiveTitleRef = titleRef ?? internalTitleRef;

  useEffect(() => {
    // If new/selected note, no-op. Focus handled by parent optionally.
  }, [note?.id]);

  return (
    <div>
      <label className="visually-hidden" htmlFor="note-title">Title</label>
      <input
        id="note-title"
        ref={effectiveTitleRef}
        className="input"
        placeholder="Note title"
        value={note.title}
        onChange={(e) => debouncedChange({ title: e.target.value })}
        aria-label="Note title"
      />
      <div style={{ height: 12 }} />
      <label className="visually-hidden" htmlFor="note-content">Content</label>
      <textarea
        id="note-content"
        className="textarea"
        placeholder="Write your note..."
        value={note.content}
        onChange={(e) => debouncedChange({ content: e.target.value })}
        aria-label="Note content"
      />
    </div>
  );
}
