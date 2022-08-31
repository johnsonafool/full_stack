import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// const store = configureStore({
//   reducer: { notes: noteReucer, filter: filterReducer },
// });

// noteService.getAll().then((notes) => store.dispatch(setNotes(notes)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
