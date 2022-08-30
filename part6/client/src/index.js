import { configureStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import filterReducer from "./reducers/filterReducer";
import noteReucer, { setNotes } from "./reducers/noteRedcuer";
import noteService from "./services/notes";

// const reducer = combineReducers({
//   notes: noteReucer,
//   filter: filterReducer,
// });

// const store = createStore(reducer);

const store = configureStore({
  reducer: { notes: noteReucer, filter: filterReducer },
});

// noteService.getAll().then((notes) =>
//   notes.forEach((note) => {
//     store.dispatch(appendNote(note));
//   })
// );

// getAll().then((notes) =>
//   notes.forEach((note) => {
//     store.dispatch(appendNote(note));
//   })
// );

noteService.getAll().then((notes) => store.dispatch(setNotes(notes)));

// console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
