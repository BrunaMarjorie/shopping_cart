import { createSlice, current } from "@reduxjs/toolkit";
import { addToCart } from "./thunk";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: []
    },
    reducers: {
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
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, { payload }) => console.log(current(state)));

        // builder.addCase(getProductById.rejected, (state, { payload }) => {
        //     console.log(payload)
        // })
    }
});

export const { removeFromCart, updateAmount } = cartSlice.actions;
export default cartSlice.reducer;