import { configureStore } from "@reduxjs/toolkit";

import productModalSlice from "./product-modal/productModalSlice";
import cartItemSlice from "./shopping-cart/cartItemSlice";
import userRegisterSlice from "./login-register/userRegisterSlice";
import userLoginSlice from "./login-register/userLoginSlice";


export const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cartItems: cartItemSlice,
        userRegister: userRegisterSlice,
        userLogin: userLoginSlice,

    },
});
