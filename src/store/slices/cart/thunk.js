import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { updateAmount, addToCart, removeFromCart } from "./reducer";
import { toast } from "react-toastify";

export const addingToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, thunk) => {
    const { cart } = thunk.getState();
    const product = cart.products.find((e) => e.id === productId);

    const stock = (await api.get(`stock/${productId}`)).data;

    if (stock.amount === 0) {
      toast.error("Sorry, we don't have more of this product!");
      return;
    }

    if (product) {
      thunk.dispatch(updateAmount({ product: product, amount: 1 }));
    } else {
      try {
        const { data } = await api.get(`products/${productId}`);
        thunk.dispatch(addToCart(data));
      } catch (error) {
        return thunk.rejectWithValue(error.message);
      }
    }

    const newAmount = stock.amount - 1;
    await api.patch(`stock/${productId}`, {amount: newAmount}).then(() => {
      toast.success("Product added to your cart.");
    })
  }
);

export const updatingCart = createAsyncThunk(
  "cart/updateAmount",
  async ({ productId, amount }, thunk) => {
    const { cart } = thunk.getState();
    const product = cart.products.find((e) => e.id === productId);

    const stock = (await api.get(`stock/${productId}`)).data;

    if (stock.amount === 0 && amount > 0) {
      toast.error("Sorry, we don't have more of this product!");
      return;
    } 

    const newAmount = stock.amount - amount;
    await api.patch(`stock/${productId}`, {amount: newAmount}).then(() => {
      toast.success("Cart updated!");
      thunk.dispatch(updateAmount({ product, amount }));
    })
  }
);

export const removingFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, amount }, thunk) => {
    const stock = (await api.get(`stock/${productId}`)).data;

    const newAmount = stock.amount + amount;
    await api.patch(`stock/${productId}`, {amount: newAmount}).then(() => {
      toast.success("Product removed from your cart.");
      thunk.dispatch(removeFromCart(productId));
    })
  }
);
