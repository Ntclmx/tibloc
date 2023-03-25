import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    messaage: ""
}

export const signIn = createAsyncThunk("user/signIn", async(req, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:4000/v1/sign-in', {
            "email": req.email,
            "password": req.password,
        });
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:4000/v1/me');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const signOut = createAsyncThunk("user/signOut", async()=>{
    await axios.delete('http://localhost:4000/v1/sign-out')
});

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(signIn.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(signIn.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(signIn.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //Get user login
        builder.addCase(getMe.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;