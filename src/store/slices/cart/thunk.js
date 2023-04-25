import { createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { formatPrice } from "../../../util/format";
import { updateAmount } from "./reducer";

export const addToCart = createAsyncThunk(
  "cart/add",
  async (productId, thunk) => {
    const { cart } = thunk.getState();
    const product = cart.products.find((e) => e.id === productId);
    let amount = 0;

    if (product) {
      amount = product.amount++;

      thunk.dispatch(updateAmount(product.id, amount));
    } else {
      try {
        const { data } = await api.get(`products/${productId}`);
        data.formattedPrice = formatPrice(data.price);
        data.amount = 1;
        
        thunk.getState().cart.products.push(data);
      } catch (error) {
        return thunk.rejectWithValue(error.message);
      }
    }
  }
);
