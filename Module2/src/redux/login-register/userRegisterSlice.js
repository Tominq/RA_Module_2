import api from "../../services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const register = createAsyncThunk("register", async (newUser) => {
    let res = await api.user.createUser(newUser);
    return {
        user: res.data,
    };
});

const checkExistingAccount = createAsyncThunk(
    "checkExistingAccount",
    async (email) => {
        let res = await api.user.findAllUser(email);
        return {
            users: res.data,
            email: email,
        };
    }
);

const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = true;
            state.user = action.payload.user;
        });
    },
});

export const userRegisterAction = {
    ...userRegisterSlice.actions,
    register,
};

export default userRegisterSlice.reducer;
