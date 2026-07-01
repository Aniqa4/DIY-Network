import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type NotifType = "like" | "comment" | "follow" | "save" | "publish"

export interface Notification {
  id: string
  type: NotifType
  message: string
  blogTitle?: string
  read: boolean
  time: string
}

interface NotifState { items: Notification[] }

// Seed notifications — replace with GET /api/notifications on mount
const SEED: Notification[] = [
  { id: "n1", type: "follow",  message: "Sarah Chen started following you",              read: false, time: "2m ago" },
  { id: "n2", type: "like",    message: "Tom Greenfield liked your post",                blogTitle: "Sourdough at Home",   read: false, time: "1h ago" },
  { id: "n3", type: "comment", message: "Hannah Brooks commented on your post",          blogTitle: "Weekend Workbench",   read: true,  time: "3h ago" },
  { id: "n4", type: "save",    message: "Priya Nair saved your post",                    blogTitle: "Garden Raised Beds",  read: true,  time: "1d ago" },
]

let _nextId = SEED.length + 1

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { items: SEED } as NotifState,
  reducers: {
    // TODO: replace with real-time push (WebSocket / SSE) or polling GET /api/notifications
    addNotification(state, action: PayloadAction<Pick<Notification, "type" | "message" | "blogTitle">>) {
      state.items.unshift({
        ...action.payload,
        id: `n${_nextId++}`,
        read: false,
        time: "just now",
      })
    },
    markRead(state, action: PayloadAction<string>) {
      const n = state.items.find(n => n.id === action.payload)
      if (n) n.read = true
    },
    markAllRead(state) {
      state.items.forEach(n => { n.read = true })
    },
  },
})

export const { addNotification, markRead, markAllRead } = notificationsSlice.actions
export default notificationsSlice.reducer
