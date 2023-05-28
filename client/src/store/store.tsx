import { configureStore } from "@reduxjs/toolkit";
import profilePhotoReducer from "../reducers/ProfilePhotoSlice";
import profileNicknameSlice from "../reducers/ProfileNicknameSlice";
import memberIdSlice from "../reducers/memberIdSlice";
import isAdminSlice from "../reducers/isAdminSlice";
import commentsReducer from "../reducers/commentsSlice";

const store = configureStore({
   reducer: {
      profilePhoto: profilePhotoReducer,
      profileNickname: profileNicknameSlice,
      memberId: memberIdSlice,
      isAdmin: isAdminSlice,
      comments: commentsReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
