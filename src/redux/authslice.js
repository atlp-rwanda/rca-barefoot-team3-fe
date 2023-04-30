import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './messageSlice';
import AuthService from '../utils/api';
const initialState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

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



export const { setToken, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
