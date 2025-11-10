import { configureStore } from "@reduxjs/toolkit";
import { userSlice, postSlice } from "./";




export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});