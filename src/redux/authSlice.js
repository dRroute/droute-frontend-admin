import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDriver,
  getAllJourneys,
  getAllOrders,
  getAllUser,
  getUserById,
  signIn,
  updateDriver,
  updateUser,
} from "./authThunk";

const initialState = {
  user: null,
  orders: [],
  journeys: [],
  drivers: [],
  users: [],
  couriers:[],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("user_id");
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.data;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Sign-in failed.";
      })

      // Get User by ID (Restore User)
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "User restoration failed.";
      });
    builder
      // get all user
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action?.payload?.data;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Get all user failed";
      });
    builder
      // get all drivers
      .addCase(getAllDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action?.payload?.data;
      })
      .addCase(getAllDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Get all driver failed";
      });
    builder
      // get all journeys
      .addCase(getAllJourneys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJourneys.fulfilled, (state, action) => {
        state.loading = false;
        state.journeys = action?.payload?.data;
      })
      .addCase(getAllJourneys.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Get all journey failed";
      });
    builder
      // get all orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action?.payload?.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "get all orders failed";
      });
    builder
      // get all update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action?.payload?.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "update User failed";
      });
    builder
      // get all update Driver
      .addCase(updateDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action?.payload?.data;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "update Driver failed";
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
