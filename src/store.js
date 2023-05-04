import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authslice';
import messageReducer from './redux/messageSlice';

const reducer = { auth: authReducer, message: messageReducer };

export const store = configureStore({
  reducer,
});
