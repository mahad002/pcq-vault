import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultsState {
  mappedResults: any[];
}

const initialState: ResultsState = {
  mappedResults: [],
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setMappedResults: (state, action: PayloadAction<any[]>) => {
      state.mappedResults = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    results: resultsSlice.reducer,
  },
});

export const { setMappedResults } = resultsSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

