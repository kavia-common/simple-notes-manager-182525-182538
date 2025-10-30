import { render, screen, fireEvent } from '@testing-library/react';
import NoteEditor from '../../Notes/NoteEditor';

jest.useFakeTimers();

test('updates title and content via debounced handler', () => {
  const note = { id: 'n1', title: '', content: '', createdAt: '', updatedAt: '', pinned: false };
  const onChange = jest.fn();

  render(<NoteEditor note={note} onChange={onChange} />);
  const title = screen.getByLabelText(/note title/i);
  const content = screen.getByLabelText(/note content/i);

  fireEvent.change(title, { target: { value: 'Hello' } });
  fireEvent.change(content, { target: { value: 'World' } });

  // Fast-forward debounce
  jest.runAllTimers();

  expect(onChange).toHaveBeenCalled();
});
