import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FollowsState { ids: string[] }

// Seeded from UserProfile mock data (isFollowing: true users + all of FOLLOWING list)
const followsSlice = createSlice({
  name: "follows",
  initialState: {
    ids: ["f1", "f3", "f6", "g1", "g2", "g3", "g4", "g5"],
  } as FollowsState,
  reducers: {
    // TODO: replace with POST/DELETE /api/follows/:userId
    toggleFollow(state, action: PayloadAction<string>) {
      const idx = state.ids.indexOf(action.payload)
      if (idx === -1) state.ids.push(action.payload)
      else state.ids.splice(idx, 1)
    },
  },
})

export const { toggleFollow } = followsSlice.actions
export default followsSlice.reducer
