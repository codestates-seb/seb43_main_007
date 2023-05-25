import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

const isAdminIdSlice = createSlice({
   name: "isAdmin",
   initialState,
   reducers: {
      setIsAdmin: (_, action: PayloadAction<boolean>) => {
         return action.payload;
      },
   },
});

export const { setIsAdmin } = isAdminIdSlice.actions;

export default isAdminIdSlice.reducer;
