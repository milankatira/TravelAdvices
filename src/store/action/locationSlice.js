import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the thunk
export const fetchLocationData = createAsyncThunk(
  "location/fetchData",
  async (queryParams) => {
    const options = {
      method: "GET",
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/search",
      params: {
        q: queryParams,
        "accept-language": "en",
        polygon_threshold: "0.0",
      },
      headers: {
        "X-RapidAPI-Key": "931d381d6amsh8e51610bc31ce58p1b4d51jsn6c9311055d68",
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    console.log(response.data, "response.data");
    return response.data && response.data[0];
  }
);

// Define the slice
export const locationSlice = createSlice({
  name: "location",
  initialState: {
    data: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocationData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLocationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default locationSlice.reducer;
