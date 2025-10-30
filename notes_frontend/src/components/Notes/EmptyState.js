/* eslint-disable react/prop-types */
// PUBLIC_INTERFACE
export default function EmptyState() {
  return (
    <div className="editor-card" role="region" aria-label="No note selected">
      <h2 style={{ marginTop: 0 }}>Welcome to Notes</h2>
      <p>Select a note from the left or create a new one.</p>
    </div>
  );
}
