import { configureStore } from "@reduxjs/toolkit";
import cartReducer  from "./slices/cart/reducer";
import reactotron from "../config/ReactotronConfig";

export const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    enhancers: (process.env.NODE_ENV === 'development') ? [reactotron.createEnhancer()] : null
  })

export default store;