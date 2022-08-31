import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./slice/notesSlice";
import authSlice from "./slice/authSlice";


const store = configureStore({
  reducer: {
    notesSlice,
    auth: authSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
