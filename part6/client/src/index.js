import { configureStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import filterReducer from "./reducers/filterReducer";
import noteReucer from "./reducers/noteRedcuer";

// const reducer = combineReducers({
//   notes: noteReucer,
//   filter: filterReducer,
// });

// const store = createStore(reducer);

const store = configureStore({
  reducer: { notes: noteReucer, filter: filterReducer },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
