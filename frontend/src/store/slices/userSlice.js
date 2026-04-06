/* eslint-disable no-self-assign */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    fetchLeaderboardRequest(state, action) {
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload ?? [];
    },
    fetchLeaderboardFailed(state, action) {
      state.loading = false;
      state.leaderboard = [];
    },
    forgotPasswordRequest(state, action) {
      state.loading = true;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
    },
    resetPasswordRequest(state, action) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.leaderboard = state.leaderboard;
      state.loading = false;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-plat-backende.onrender.com";
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/user/register`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-plat-backende.onrender.com";
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/user/login`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
    toast.error(errorMsg);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const sendForgotPasswordEmail = (data) => async (dispatch) => {
  dispatch(userSlice.actions.forgotPasswordRequest());
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-plat-backende.onrender.com";
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/user/password/forgot`,
      data,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.forgotPasswordSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.forgotPasswordFailed());
    const errorMsg = error.response?.data?.message || "Failed to send forgot password email.";
    toast.error(errorMsg);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const resetPassword = (data) => async (dispatch) => {
  dispatch(userSlice.actions.resetPasswordRequest());
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-plat-backende.onrender.com";
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/user/password/reset/${data.token}`,
      { password: data.password, confirmPassword: data.confirmPassword },
      { withCredentials: true }
    );
    dispatch(userSlice.actions.resetPasswordSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.resetPasswordFailed());
    const errorMsg = error.response?.data?.message || "Failed to reset password.";
    toast.error(errorMsg);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-plat-backende.onrender.com";
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/user/logout`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-plat-backende.onrender.com";
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/user/me`,
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auction-plat-backende.onrender.com";
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/user/leaderboard`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard)
    );
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};

export default userSlice.reducer;
