import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: false,
    selectedBoardId: 1,
  },
  reducers: {
    setDisplayDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    setSelectedBoardID: (state, action) => {
      state.selectedBoardId = action.payload;
    },
  },
});

export const { setDisplayDarkMode, setSelectedBoardID } = appSlice.actions;
export default appSlice.reducer;
