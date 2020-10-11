import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './src/user'

export const store = configureStore({
  reducer: {
    user: userReducer,
  }
})
