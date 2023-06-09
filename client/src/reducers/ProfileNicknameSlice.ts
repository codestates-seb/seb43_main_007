import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileNicknameState {
   nickname: string;
}
const initialState: ProfileNicknameState = {
   nickname: "",
};

const profileNicknameSlice = createSlice({
   name: "nickname",
   initialState,
   reducers: {
      setNickname: (state, action: PayloadAction<string>) => {
         return { ...state, nickname: action.payload };
      },
   },
});

export const { setNickname } = profileNicknameSlice.actions;

export default profileNicknameSlice.reducer;
