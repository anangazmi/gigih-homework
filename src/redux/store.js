import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
