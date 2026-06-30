import { configureStore } from "@reduxjs/toolkit"
import calculatorSlice from "./features/calculator/calculatorSlice"
import savedReducer from "./features/saved/savedSlice"

const store = configureStore({
  reducer: {
    calculator: calculatorSlice,
    saved: savedReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
