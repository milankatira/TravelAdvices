import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./action/locationSlice";
import placeReducer from "./action/placeSlice";
import establishment from "./action/establishment.js";
export const store = configureStore({
  reducer: {
    place: placeReducer,
    location: locationReducer,
    establishment: establishment,
  },
});
