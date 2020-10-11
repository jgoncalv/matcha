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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      const { token } = action.payload;
      sdk.setToken(token);
      state.isConnected = true;
    },
  }
});

export const userReducer = userSlice.reducer;
