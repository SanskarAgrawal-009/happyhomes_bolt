import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import projectsReducer from './slices/projectsSlice';
import portfoliosReducer from './slices/portfoliosSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    portfolios: portfoliosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
