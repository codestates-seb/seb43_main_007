import { configureStore } from "@reduxjs/toolkit";
import profilePhotoReducer from "../reducers/ProfilePhotoSlice";

const store = configureStore({
   reducer: {
      profilePhoto: profilePhotoReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
