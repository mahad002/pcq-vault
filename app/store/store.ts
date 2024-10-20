import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  mappedResults: [],
};

// Define the slice
const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setMappedResults: (state, action) => {
      state.mappedResults = action.payload;
    },
  },
});

// Create the store
const store = configureStore({
  reducer: {
    results: resultsSlice.reducer,
  },
});

export const { setMappedResults } = resultsSlice.actions;

export default store;