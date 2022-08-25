import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NoteForm from "./NoteForm";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn();
  const user = userEvent.setup(); // write text to input field

  render(<NoteForm createNote={createNote} />);

  const input = screen.getByRole("textbox"); // where tests gets access to input
  // if there are serveral forms in the page
  //   await user.type(inputs[0], 'testing a form...')

  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});

test("<NoteForm /> updates parent state and calls onSubmit", () => {
  const createNote = jest.fn();

  render(<NoteForm createNote={createNote} />);

  const input = screen.getByPlaceholderText("write here note content");
  const sendButton = screen.getByText("save");

  userEvent.type(input, "testing a form...");
  userEvent.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
