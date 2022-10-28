import { configureStore } from '@reduxjs/toolkit';

// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { kanbanApi } from './../API/APIslice';

import appReducer from '../components/App/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [kanbanApi.reducerPath]: kanbanApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kanbanApi.middleware),
});

setupListeners(store.dispatch);
