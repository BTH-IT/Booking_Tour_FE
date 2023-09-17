import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: any;
}

const initialState: AuthState = {
  isLoggedIn: Boolean(localStorage.getItem('access_token')),
  logging: false,
  currentUser: JSON.parse(localStorage.getItem('current_user') || '{}'),
};

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// Actions
export const authActions = authSlide.actions;

// Selectors
export const selectAuth = (state: any) => state.auth;

// Reducer
const authReducer = authSlide.reducer;
export default authReducer;
