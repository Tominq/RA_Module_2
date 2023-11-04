import api from "../../services/api";
import CryptoJS from "crypto-js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addItem,
    removeItem,
    updateItem,
    clearCart,
} from "../shopping-cart/cartItemSlice";

const login = createAsyncThunk("login", async (inforLogin, { dispatch }) => {
    let res = await api.user.findAllUser();
    return {
        users: res.data,
        inforLogin: inforLogin,
    };
});

const checkTokenLocal = createAsyncThunk(
    "checkTokenLocal",
    async (token, { dispatch }) => {
        let res = await api.user.findAllUser();
        return {
            users: res.data,
            token: token,
        };
    }
);

function createToken(userObj, privateKey) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    const userWithCart = {
        ...userObj,
        cart: cartItems || [],
    };

    return CryptoJS.AES.encrypt(
        JSON.stringify(userWithCart),
        privateKey
    ).toString();
}

function checkToken(token, privateKey, keyEnv) {
    try {
        if (privateKey !== keyEnv) {
            return false;
        }
        const decryptedData = CryptoJS.AES.decrypt(token, privateKey).toString(
            CryptoJS.enc.Utf8
        );
        return JSON.parse(decryptedData);
    } catch {
        return false;
    }
}

const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
        loading: false,
        userInfor: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            let user = action.payload.users.find(
                (item) => item.email === action.payload.inforLogin.userEmail
            );

            console.log(user);

            if (!user) {
                alert(
                    "Account doesn't exist! Check the email and password again!"
                );
            } else {
                state.userInfor = user;
                let token = createToken(user, import.meta.env.VITE_APP_JWT_KEY);
                localStorage.setItem("token", token);
            }
        });
        builder.addCase(checkTokenLocal.fulfilled, (state, action) => {
            let deToken = checkToken(
                action.payload.token,
                import.meta.env.VITE_APP_JWT_KEY,
                import.meta.env.VITE_APP_JWT_KEY
            );
            let user = action.payload.users.find(
                (user) => user.userName === deToken.userName
            );
            if (deToken) {
                if (user) {
                    if (user.password === deToken.password) {
                        state.userInfor = user;
                        // Dispatch action to update cart items in the store
                        deToken.cart.forEach((item) => {
                            dispatch(addItem(item));
                        });
                    } else {
                        localStorage.removeItem("token");
                    }
                } else {
                    localStorage.removeItem("token");
                }
            } else {
                localStorage.removeItem("token");
            }
        });
    },
});

export const userLoginAction = {
    ...userLoginSlice.actions,
    login,
    checkTokenLocal,
};

export default userLoginSlice.reducer;
