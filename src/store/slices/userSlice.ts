import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'homeowner' | 'designer' | 'freelancer' | null;

interface UserState {
  role: UserRole;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  role: null,
  isAuthenticated: false,
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
    clearUser: (state) => {
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserRole, setAuthenticated, clearUser } = userSlice.actions;
export default userSlice.reducer;
