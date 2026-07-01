import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Blog } from "../../../types"

interface PostsState { items: Blog[] }

const postsSlice = createSlice({
  name: "posts",
  initialState: { items: [] } as PostsState,
  reducers: {
    // TODO: replace with createAsyncThunk + POST /api/posts
    addPost(state, action: PayloadAction<Blog>) {
      state.items.unshift(action.payload)
    },
    // TODO: replace with DELETE /api/posts/:id
    removePost(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p.id !== action.payload)
    },
    // TODO: replace with PATCH /api/posts/:id
    updatePost(state, action: PayloadAction<Blog>) {
      const idx = state.items.findIndex(p => p.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    },
  },
})

export const { addPost, removePost, updatePost } = postsSlice.actions
export default postsSlice.reducer
