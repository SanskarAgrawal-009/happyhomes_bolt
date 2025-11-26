import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'homeowner' | 'designer' | 'freelancer' | null;

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  email: string;
  phone: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface UserState {
  role: UserRole;
  isAuthenticated: boolean;
  profile: UserProfile | null;
}

const initialState: UserState = {
  role: null,
  isAuthenticated: false,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.role = null;
      state.isAuthenticated = false;
      state.profile = null;
    },
  },
});

export const { setUserRole, setAuthenticated, setUserProfile, updateUserProfile, clearUser } = userSlice.actions;
export default userSlice.reducer;
