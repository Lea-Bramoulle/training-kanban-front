import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: false,
    selectedBoardId: 1,
    toggleBordOptions: false,
  },
  reducers: {
    setDisplayDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    setSelectedBoardID: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    setToggleBordOptions: (state, action) => {
      state.toggleBordOptions = !state.toggleBordOptions;
    },
  },
});

export const { setDisplayDarkMode, setSelectedBoardID, setToggleBordOptions } =
  appSlice.actions;
export default appSlice.reducer;
