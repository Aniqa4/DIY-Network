import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthUser {
  id: string
  name: string
  email: string
  bio: string
  avatarUrl: string | null
}

interface AuthState {
  user: AuthUser | null
  isLoggedIn: boolean
}

// Demo user — swap this out for the real API response shape when ready
const DEMO_USER: AuthUser = {
  id: "u1",
  name: "Marco Russo",
  email: "marco@example.com",
  bio: "Home cook, amateur woodworker, and occasional gardener based in Rome.",
  avatarUrl: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: DEMO_USER, isLoggedIn: true } as AuthState,
  reducers: {
    // TODO: replace with createAsyncThunk + POST /api/auth/login
    login(state, action: PayloadAction<{ name?: string; email: string }>) {
      state.user = {
        ...DEMO_USER,
        name: action.payload.name ?? DEMO_USER.name,
        email: action.payload.email,
      }
      state.isLoggedIn = true
    },
    // TODO: replace with POST /api/auth/logout
    logout(state) {
      state.user = null
      state.isLoggedIn = false
    },
    // TODO: replace with PATCH /api/users/me
    updateUser(state, action: PayloadAction<Partial<AuthUser>>) {
      if (state.user) Object.assign(state.user, action.payload)
    },
  },
})

export const { login, logout, updateUser } = authSlice.actions
export default authSlice.reducer
