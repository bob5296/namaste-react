import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        loggedInUser: null,
        cartItems: []
    },
    reducers: {
        setLoggedInUser: (state,action) => {
            state.loggedInUser = action.payload;
        },
        clearUser: (state) => {
            state.loggedInUser = null;
        },
        setCartItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        clearCart: (state) => {
            state.items.Length = 0;
        }
    }
})

export const { setLoggedInUser, setCartItem, clearCart, clearUser } = appSlice.actions;
export default appSlice.reducer;