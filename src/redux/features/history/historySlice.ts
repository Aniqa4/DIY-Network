import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const MAX_HISTORY = 10

interface HistoryState { ids: string[] }

const historySlice = createSlice({
  name: "history",
  initialState: { ids: [] } as HistoryState,
  reducers: {
    // TODO: replace with POST /api/history (fire-and-forget)
    addToHistory(state, action: PayloadAction<string>) {
      state.ids = [
        action.payload,
        ...state.ids.filter(id => id !== action.payload),
      ].slice(0, MAX_HISTORY)
    },
    clearHistory(state) {
      state.ids = []
    },
  },
})

export const { addToHistory, clearHistory } = historySlice.actions
export default historySlice.reducer
