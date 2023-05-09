import { configureStore } from "@reduxjs/toolkit";
import profilePhotoReducer from "../reducers/ProfilePhotoSlice";
import profileNicknameSlice from "../reducers/ProfileNicknameSlice";

const store = configureStore({
   reducer: {
      profilePhoto: profilePhotoReducer,
      profileNickname: profileNicknameSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
