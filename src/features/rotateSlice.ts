import { createSlice } from '@reduxjs/toolkit';

interface ToggleRotate {
  value: boolean;
  credits: boolean;
}

const initialState: ToggleRotate = {
  value: false,
  credits: false,
};

export const rotateSlice = createSlice({
  name: 'rotate',
  initialState,
  reducers: {
    rotateTrue: (state) => {
      state.value = true;
    },
    rotateFalse: (state) => {
      state.value = false;
    },
    fiveCredits: (state) => {
      state.credits = true;
    },
    fiveCreditsFalse: (state) => {
      state.credits = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rotateTrue, rotateFalse, fiveCredits, fiveCreditsFalse } =
  rotateSlice.actions;

export default rotateSlice.reducer;
