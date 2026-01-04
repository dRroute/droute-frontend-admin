import { configureStore } from "@reduxjs/toolkit";

import { getUserById } from "./authThunk";
import authReducer from "../redux/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const loadUserData = async () => {
  try {
    const user_id = localStorage.getItem("user_id"); // sync API, no await needed
    console.log("User Id in store", user_id);

    if (user_id) {
      await store.dispatch(getUserById(parseInt(user_id)));
    }
  } catch (error) {
    console.log("Error loading user data:", error);
    
  }
};


loadUserData();

export default store;
