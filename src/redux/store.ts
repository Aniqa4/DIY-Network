import { configureStore } from "@reduxjs/toolkit"
import savedReducer from "./features/saved/savedSlice"
import likedReducer from "./features/liked/likedSlice"
import authReducer from "./features/auth/authSlice"
import postsReducer from "./features/posts/postsSlice"
import historyReducer from "./features/history/historySlice"
import followsReducer from "./features/follows/followsSlice"
import notificationsReducer from "./features/notifications/notificationsSlice"

const store = configureStore({
  reducer: {
    saved: savedReducer,
    liked: likedReducer,
    auth: authReducer,
    posts: postsReducer,
    history: historyReducer,
    follows: followsReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
