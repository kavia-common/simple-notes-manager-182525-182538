import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('can create a new note and it appears in list', async () => {
  render(<App />);
  const newBtn = screen.getByRole('button', { name: /new note/i });
  fireEvent.click(newBtn);

  const titleInput = await screen.findByLabelText(/note title/i);
  fireEvent.change(titleInput, { target: { value: 'My Note' } });

  await waitFor(() =>
    expect(screen.getByRole('listitem', { current: 'true' })).toBeInTheDocument()
  );
  expect(screen.getByText(/my note/i)).toBeInTheDocument();
});

test('can edit note content and see in preview', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /new note/i }));
  const content = await screen.findByLabelText(/note content/i);
  fireEvent.change(content, { target: { value: 'Hello world' } });

  await waitFor(() =>
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  );
});

test('can delete a note via modal', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /new note/i }));
  const deleteBtn = await screen.findByRole('button', { name: /delete note/i });
  fireEvent.click(deleteBtn);

  const modalDelete = await screen.findByRole('button', { name: /delete/i });
  fireEvent.click(modalDelete);

  await waitFor(() =>
    expect(screen.getByText(/no notes/i)).toBeInTheDocument()
  );
});
