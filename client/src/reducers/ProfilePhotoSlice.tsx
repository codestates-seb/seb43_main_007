import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfilePhotoState {
   photo: string;
}
const initialState: ProfilePhotoState = {
   photo: "",
};

const profilePhotoSlice = createSlice({
   name: "profilePhoto",
   initialState,
   reducers: {
      setPhoto: (state, action: PayloadAction<string>) => {
         return { ...state, photo: action.payload };
      },
   },
});

export const { setPhoto } = profilePhotoSlice.actions;

export default profilePhotoSlice.reducer;
