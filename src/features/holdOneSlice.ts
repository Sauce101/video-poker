import { createSlice } from '@reduxjs/toolkit';

interface HoldState {
  toggleHold1: boolean;
  toggleHold2: boolean;
  toggleHold3: boolean;
  toggleHold4: boolean;
  toggleHold5: boolean;
}

const initialState: HoldState = {
  toggleHold1: false,
  toggleHold2: false,
  toggleHold3: false,
  toggleHold4: false,
  toggleHold5: false,
};

export const holdCardOneSlice = createSlice({
  name: 'holdCardOne',
  initialState,
  reducers: {
    holdOne: (state) => {
      state.toggleHold1 = !state.toggleHold1;
    },
    holdReset1: (state) => {
      state.toggleHold1 = false;
    },
    holdTwo: (state) => {
      state.toggleHold2 = !state.toggleHold2;
    },
    holdReset2: (state) => {
      state.toggleHold2 = false;
    },
    holdThree: (state) => {
      state.toggleHold3 = !state.toggleHold3;
    },
    holdReset3: (state) => {
      state.toggleHold3 = false;
    },
    holdFour: (state) => {
      state.toggleHold4 = !state.toggleHold4;
    },
    holdReset4: (state) => {
      state.toggleHold4 = false;
    },
    holdFive: (state) => {
      state.toggleHold5 = !state.toggleHold5;
    },
    holdReset5: (state) => {
      state.toggleHold5 = false;
    },
  },
});

export const {
  holdOne,
  holdReset1,
  holdTwo,
  holdReset2,
  holdThree,
  holdReset3,
  holdFour,
  holdReset4,
  holdFive,
  holdReset5,
} = holdCardOneSlice.actions;

export default holdCardOneSlice.reducer;
