import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  // Normally React components are rendered to the DOM.
  // The render method we used renders the components in a format
  // that is suitable for tests without rendering them to the DOM.
  // render function provided by the react-testing-library:
  render(<Note note={note} />);

  // We can use the object screen to access the rendered component.
  // We use screen's method getByText to search for an element that has the note content and ensure that it exists:
  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

// run tests "normally" with the command: //
// CI=true npm test //

// Clicking buttons in tests
test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = jest.fn(); // e handler is a mock function from jest

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

// gen inspecting coverage folder //
// CI=true npm test -- --coverage //
