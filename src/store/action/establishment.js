import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the thunk with dynamic parameters including establishment type
export const fetchEstablishmentsByLatLong = createAsyncThunk(
  "establishments/fetchByLatLong",
  async ({ establishmentType, latitude, longitude, ...otherParams }) => {
    const options = {
      method: "GET",
      url: `https://travel-advisor.p.rapidapi.com/${establishmentType}/list-by-latlng`,
      params: {
        latitude,
        longitude
      },
      headers: {
        "X-RapidAPI-Key": "931d381d6amsh8e51610bc31ce58p1b4d51jsn6c9311055d68",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    console.log(response.data, latitude,longitude,"response.data");
    return response.data;
  }
);

// Define the slice
export const establishmentsSlice = createSlice({
  name: 'establishments',
  initialState: {
    data: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstablishmentsByLatLong.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEstablishmentsByLatLong.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchEstablishmentsByLatLong.rejected, (state, action) => {
        console.log(action.error, "action.error");
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Export the reducer
export default establishmentsSlice.reducer;

