import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const res = axios.get("https://localhost:7295/api/User/getusers");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState={
    users:[]
}

const userSlice=createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.users=action.payload;
        })
    }
})

export default userSlice.reducer;
