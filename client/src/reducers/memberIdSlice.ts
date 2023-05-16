import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 0;

const memberIdSlice = createSlice({
   name: "memberId",
   initialState,
   reducers: {
      setMemberId: (_, action: PayloadAction<number>) => {
         return action.payload;
      },
   },
});

export const { setMemberId } = memberIdSlice.actions;

export default memberIdSlice.reducer;
