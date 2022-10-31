import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    toggleSidebar: true,
    darkMode: false,
    selectedBoardId: 1,
    toggleBordOptions: false,
  },
  reducers: {
    setToggleSidebar: (state, action) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
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

export const {
  setDisplayDarkMode,
  setSelectedBoardID,
  setToggleBordOptions,
  setToggleSidebar,
} = appSlice.actions;
export default appSlice.reducer;
