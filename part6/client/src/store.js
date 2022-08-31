import { configureStore } from "@reduxjs/toolkit";
import noteRedcuer from "./reducers/noteRedcuer";

import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    notes: noteRedcuer,
    filter: filterReducer,
  },
});

export default store;
