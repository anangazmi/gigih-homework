import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
