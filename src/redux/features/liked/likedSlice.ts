import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LikedState { ids: string[] }

const likedSlice = createSlice({
  name: "liked",
  initialState: { ids: [] } as LikedState,
  reducers: {
    // TODO: replace with createAsyncThunk + POST /api/likes
    toggleLiked(state, action: PayloadAction<string>) {
      const idx = state.ids.indexOf(action.payload)
      if (idx === -1) state.ids.push(action.payload)
      else state.ids.splice(idx, 1)
    },
  },
})

export const { toggleLiked } = likedSlice.actions
export default likedSlice.reducer
