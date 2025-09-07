import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from "./widgetSlice";

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
});