import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../components/App/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
