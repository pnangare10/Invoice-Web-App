import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState : {
    showToast:false,
    title:"",
    message:"",
    type:"info",
  },
  reducers : {
    showToastBanner: (state, action) => {
      state.showToast = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToastBanner: (state) => {
      state.showToast = false;
    },
  },
});

export const {showToastBanner, hideToastBanner} = toastSlice.actions;
export default toastSlice.reducer;