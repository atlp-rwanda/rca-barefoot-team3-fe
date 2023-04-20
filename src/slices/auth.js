import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk(
  'auth/register',
  async ({
    first_name, last_name, gender, password, password_confirmation, username, email,
  }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        first_name,
        last_name,
        gender,
        password,
        password_confirmation,
        username,
        email,
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message = error.response.data.errors.message[0];

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const verify = createAsyncThunk(
  'auth/verify',
  async ({
    code, email,
  }, thunkAPI) => {
    try {
      const response = await AuthService.verify(code, email);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message = error.response.data.errors.message[0];

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [verify.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [verify.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },

  },
});

const { reducer } = authSlice;
export default reducer;