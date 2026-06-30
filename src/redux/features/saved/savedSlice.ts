import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SavedState {
  ids: string[]
}

const initialState: SavedState = { ids: [] }

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    toggleSaved(state, action: PayloadAction<string>) {
      const idx = state.ids.indexOf(action.payload)
      if (idx === -1) {
        state.ids.push(action.payload)
      } else {
        state.ids.splice(idx, 1)
      }
    },
  },
})

export const { toggleSaved } = savedSlice.actions
export default savedSlice.reducer
