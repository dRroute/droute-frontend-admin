import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllDriverAPI, getAllJourneyAPI, getAllOrderAPI, getUserByIdAPI, signInAPI, updateDriverAPI, updateUserAPI } from "../utils/api/authApi";

// Helper to handle errors
export const handleAxiosError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return {
        message: "Network error. Please try again later.",
        statusCode: 500,
        data: null,
        errorCode: "NETWORK_ERROR",
        timestamp: Date.now(),
      };
    } else {
      return { message: error.message };
    }
  } else {
    return { message: "Unexpected error occurred" };
  }
};

// Sign In Thunk
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signInAPI(data);
      return response.data;
    } catch (error) {
      console.error("Error in signIn:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Get User By ID Thunk (for restoring session)
export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserByIdAPI(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getUserById:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Get All User  Thunk (for restoring session)
export const getAllUser = createAsyncThunk(
  "data/getAllUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await getAllUserAPI();
      return response.data;
    } catch (error) {
      console.error("Error in getAllUser thunk:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Get All User  Thunk (for restoring session)
export const getAllDriver = createAsyncThunk(
  "data/getAllDriver",
  async ({ rejectWithValue }) => {
    try {
      const response = await getAllDriverAPI();
      return response.data;
    } catch (error) {
      console.error("Error in getAlldriver thunk:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);


export const getAllJourneys = createAsyncThunk(
  "data/getAllJourneys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllJourneyAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Journey fetch failed");
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "data/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllOrderAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Order fetch failed");
    }
  }
);

export const updateUser = createAsyncThunk(
  "data/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUserAPI(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "User update failed");
    }
  }
);
export const updateDriver = createAsyncThunk(
  "data/updateDriver",
  async (driverData, { rejectWithValue }) => {
    try {
      const response = await updateDriverAPI(driverData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Driver update failed");
    }
  }
);
