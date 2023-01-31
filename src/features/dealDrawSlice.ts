import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const dealDrawSlice = createSlice({
  name: 'dealDraw',
  initialState,
  reducers: {
    deal: (state) => {
      state.value = true;
    },
    draw: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deal, draw } = dealDrawSlice.actions;

export default dealDrawSlice.reducer;
