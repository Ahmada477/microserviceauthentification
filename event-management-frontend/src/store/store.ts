// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import guestReducer from './slices/guestSlice';
import registrationReducer from './slices/registrationSlice';
import logisticsReducer from './slices/logisticsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    guests: guestReducer,
    registrations: registrationReducer,
    logistics: logisticsReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;