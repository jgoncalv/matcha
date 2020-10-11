import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken';

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
  score: 0,
  interests: [],
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
      const { username } = action.payload;
      state.isConnected = true;
      state.username = username;
    }
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      const { token } = action.payload;
      const { username } = jwt.decode(token);

      // Set the axios default user token for the future api call
      sdk.setToken(token);
      // Set the token in the local storage for accessing to it after
      localStorage.setItem('token', token);
      state.isConnected = true;
      state.username = username;
    },
    [fetchUserProfile.fulfilled]: (state, action) => {
      const { first_name, biography, interests, name, score } = action.payload;

      state.firstName = first_name;
      state.biography = biography;
      state.name = name;
      state.score = score;
      state.interests = interests;
    }
  }
});

export const { setUserConnected } = userSlice.actions;

export const userReducer = userSlice.reducer;
