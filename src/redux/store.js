import { configureStore } from '@reduxjs/toolkit';
import reducer from './auth-reducer';

export default configureStore({
  reducer: {
    auth: reducer,
  },
});
