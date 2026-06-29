import { createSlice } from "@reduxjs/toolkit"

interface CalculatorState {
  calculator: number
}

const initialState: CalculatorState = {
  calculator: 0,
}

const calculatorSlice = createSlice({
  name: "calculatorSlice",
  initialState,
  reducers: {},
})

export default calculatorSlice.reducer
