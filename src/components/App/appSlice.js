import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    toggleSidebar: true,
    darkMode: false,
    toggleBordOptions: false,
    toggleTaskOptions: false,
    toggleTaskStatusOptions: false,
    selectedBoardId: 1,
    selectedTaskId: null,
  },
  reducers: {
    setToggleSidebar: (state, action) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
    setDisplayDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    setToggleBordOptions: (state, action) => {
      state.toggleBordOptions = !state.toggleBordOptions;
    },
    setToggleTaskStatusOptions: (state, action) => {
      state.toggleTaskStatusOptions = !state.toggleTaskStatusOptions;
    },
    setToggleTaskOptions: (state, action) => {
      state.toggleTaskOptions = !state.toggleTaskOptions;
    },
    setSelectedBoardID: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    setSelectedTaskID: (state, action) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const {
  setDisplayDarkMode,
  setSelectedBoardID,
  setToggleBordOptions,
  setToggleSidebar,
  setSelectedTaskID,
  setToggleTaskOptions,
  setToggleTaskStatusOptions,
} = appSlice.actions;
export default appSlice.reducer;
