import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: false,
  },
  reducers: {
    setDisplayDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setDisplayDarkMode } = appSlice.actions;
export default appSlice.reducer;
