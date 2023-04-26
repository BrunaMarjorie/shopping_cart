import { createSlice } from "@reduxjs/toolkit";
import { formatPrice } from "../../../util/format";
// import { addToCart } from "./thunk";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: []
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;

            product.amount = 1;
            product.formattedPrice = formatPrice(product.price);
            state.products.push(product);
        },

        removeFromCart: (state, action) => {
            const productIndex = state.products.findIndex(e => e.id === action.payload);

            if (productIndex > -1) {
                state.products.splice(productIndex, 1);
            }
        },

        updateAmount: (state, action) => {
            const productIndex = state.products.findIndex(e => e.id === action.payload.product.id);

            if (productIndex > -1) {
                state.products[productIndex].amount += action.payload.amount;

                if (state.products[productIndex].amount === 0) {
                    state.products.splice(productIndex, 1);
                }
            }
        }
    },
});

export const { addToCart, removeFromCart, updateAmount } = cartSlice.actions;
export default cartSlice.reducer;