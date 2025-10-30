import { render, screen, fireEvent } from '@testing-library/react';
import NoteList from '../../Notes/NoteList';

const notes = [
  { id: '1', title: 'First', content: 'alpha', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), pinned: false },
  { id: '2', title: 'Second', content: 'beta', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), pinned: true },
];

test('renders notes and highlights selected', () => {
  const onSelect = jest.fn();
  render(<NoteList notes={notes} selectedId="2" onSelect={onSelect} />);

  expect(screen.getByText(/Second/)).toBeInTheDocument();
  const active = screen.getByRole('listitem', { current: 'true' });
  expect(active).toBeInTheDocument();

  fireEvent.click(screen.getByText(/First/));
  expect(onSelect).toHaveBeenCalled();
});
