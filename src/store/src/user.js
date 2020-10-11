import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sdk from '../../sdk'

const initialState = {
  username: '',
  name: '',
  firstName: '',
  isConnected: false,
  hasConfirmedEmail: false,
  hasFilledHisProfile: false,
  biography: '',
  gender: '',
  sexualOrientation: '',
};


export const userLogin = createAsyncThunk('user/login',async (data) => {
  const res = await sdk.auth.login(data);
  return res.data;
})

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile',async (data) => {
  const res = await sdk.user.getProfil(data);
  return res.data;
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserConnected(state, action) {
      state.isConnected = true;
    }
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      const { token } = action.payload;
      // Set the axios default user token for the future api call
      sdk.setToken(token);
      // Set the token in the local storage for accessing to it after
      localStorage.setItem('token', token);
      state.isConnected = true;
    },
  }
});

export const { setUserConnected } = userSlice.actions;

export const userReducer = userSlice.reducer;
