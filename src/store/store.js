import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./action/locationSlice";
import placeReducer from "./action/placeSlice";

export const store = configureStore({
  reducer: {
    place: placeReducer,
    location: locationReducer,
  },
});
