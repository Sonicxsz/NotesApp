import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./slice/notesSlice";
import todoSlice from "./slice/todoSlice";
const store = configureStore({
  reducer: {
    notesSlice,
    todoSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
