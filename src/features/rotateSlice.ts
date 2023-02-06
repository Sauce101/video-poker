import { createSlice } from '@reduxjs/toolkit';

interface ToggleRotate {
  value: boolean;
}

const initialState: ToggleRotate = {
  value: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { rotateTrue, rotateFalse } = rotateSlice.actions;

export default rotateSlice.reducer;
