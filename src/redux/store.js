import { configureStore } from '@reduxjs/toolkit';
// import reducer from './reducer';
import AuthSlice from './slice';

export default configureStore({
  reducer: {
    // auth: reducer,
    auth: AuthSlice,
  },
});
