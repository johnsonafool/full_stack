import { createSlice } from "@reduxjs/toolkit";
import noteService from '../services/notes';

// const initialState = [
//   {
//     content: "reducer defines how redux store works",
//     important: true,
//     id: 1,
//   },
//   {
//     content: "state of store can contain any data",
//     important: false,
//     id: 2,
//   },
// ];

// const genId = () => {
//   Number((Math.random() * 10000).toFixed(0));
// };

const noteSlice = createSlice({
  name: "type",
  initialState: [],
  reducer: {
    createNote(state, action) {
      state.push(action.payload); // change to this bc backend will gen new id for us, dont need to maually do it
      // const content = action.payload;
      // state.push({
      //   content,
      //   important: false,
      //   id: genId(),
      // });
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
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;

export const initializeNotes = ()=>{
  return async dispatch =>{
    const notes = await noteService.getAll()
    dispatch(setNotes(notes)) 
    // the operation first fetches all the notes from the server
    //  and then dispatches the setNotes action, which adds them to the store.
  }
}

export default noteSlice.reducer;
