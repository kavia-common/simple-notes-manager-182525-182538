/**
 * LocalStorage-backed repository for notes.
 * Storage key NOTES_V1. Safe JSON parsing and future migration ready.
 */
const STORAGE_KEY = 'NOTES_V1';

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

function load() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return safeParse(raw, []);
}

function save(notes) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// PUBLIC_INTERFACE
export const notesRepository = {
  /** Return list of notes */
  list() {
    return load();
  },
  /** Return a note by id */
  get(id) {
    return load().find(n => n.id === id) || null;
  },
  /** Create a new note from draft {id?, title?, content?, pinned?} */
  create(draft) {
    const now = new Date().toISOString();
    const note = {
      id: draft.id,
      title: draft.title || '',
      content: draft.content || '',
      pinned: !!draft.pinned,
      createdAt: now,
      updatedAt: now,
    };
    const all = [note, ...load()];
    save(all);
    return note;
  },
  /** Update note by id with patch */
  update(id, patch) {
    const all = load();
    const idx = all.findIndex(n => n.id === id);
    if (idx === -1) return null;
    const updated = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    all[idx] = updated;
    save(all);
    return updated;
  },
  /** Remove note by id */
  remove(id) {
    const all = load().filter(n => n.id !== id);
    save(all);
  },
  /** Remove all notes */
  clearAll() {
    save([]);
  },
  /** Search notes by query string in title or content */
  search(query, source) {
    const q = query.trim().toLowerCase();
    const notes = Array.isArray(source) ? source : load();
    if (!q) return notes;
    return notes.filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q)
    );
  },
  /**
   * INTERNAL: overwrite all notes with provided array (used to sync state->storage).
   * This supports using React state as the source of truth while persisting.
   */
  overwrite(allNotes) {
    save(allNotes || []);
  }
};
