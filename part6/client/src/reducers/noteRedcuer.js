import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const genId = () => {
  Number((Math.random() * 10000).toFixed(0));
};

const noteSlice = createSlice({
  name: "type",
  initialState,
  reducer: {
    createNote(state, action) {
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: genId(),
      });
      // Redux Toolkit utilizes the Immer library with reducers created by createSlice function,
      // which makes it possible to mutate the state argument inside the reducer
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
  },
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;
