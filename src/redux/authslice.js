import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './messageSlice';
import { register, verify } from '../utils/api';

const initialState = {
  isAuthenticated: false,
  token: null,
  LoggedUser:null
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
    setLoggedUser(state,action){
      state.LoggedUser=action.payload;
    }
  },
});

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({
    first_name, last_name, gender, password, password_confirmation, username, email,
  }, thunkAPI) => {
    try {
      const response = register(
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

export const verifyUser = createAsyncThunk(
  'auth/verify',
  async ({
    code, email,
  }, thunkAPI) => {
    try {
      const response = verify(code, email);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message = error.response.data.errors.message[0];

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const { setToken, setAuthenticated,setLoggedUser } = authSlice.actions;
export default authSlice.reducer;
