import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  places: [],
  loading: false,
  error: null,
};

// Define your async thunk
export const fetchPlaces = createAsyncThunk(
  "place/fetchPlaces",
  async (input) => {
    const response = await axios({
      method: "GET",
      url: "https://place-autocomplete1.p.rapidapi.com/autocomplete/json",
      params: { input: input, radius: "500" },
      headers: {
        "X-RapidAPI-Key": "931d381d6amsh8e51610bc31ce58p1b4d51jsn6c9311055d68",
        "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
      },
    });
    return response.data;
  }
);

// Create a slice
const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default placeSlice.reducer;
