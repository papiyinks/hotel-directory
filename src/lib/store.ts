import { configureStore } from "@reduxjs/toolkit";

import hotelReducer from "@/lib/features/hotel/hotelSlice";
import categoryReducer from "@/lib/features/category/categorySlice";
import { api } from "./services/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      hotels: hotelReducer,
      categories: categoryReducer,
      [api.reducerPath]: api.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
