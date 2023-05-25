import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userprofile from "../assets/img/userprofile.png";

interface ProfilePhotoState {
   photo: string;
}
const initialState: ProfilePhotoState = {
   photo: userprofile,
};

const profilePhotoSlice = createSlice({
   name: "profilePhoto",
   initialState,
   reducers: {
      setPhoto: (state, action: PayloadAction<string>) => {
         return { ...state, photo: action.payload };
      },
      resetPhoto: (state) => {
         return { ...state, photo: initialState.photo };
      },
   },
});

export const { setPhoto, resetPhoto } = profilePhotoSlice.actions;

export default profilePhotoSlice.reducer;
