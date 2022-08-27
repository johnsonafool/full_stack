import React from "react";
// import { ReactDOM } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import noteReucer from "./reducers/noteRedcuer";

const store = createStore(noteReucer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
