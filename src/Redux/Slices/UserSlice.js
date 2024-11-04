import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const res =await axios.get("https://localhost:7295/api/User/getusers");
    console.log(res)
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserById = createAsyncThunk("user/fetchUserById", async (userId) => {
  try {
    const res =await axios.get(`https://localhost:7295/api/User/${userId}`);
    console.log(res.data)
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});


export const blockOrUnblock=createAsyncThunk('user/blockOrUnblock',async(userId)=>{
  try{
    const res=await axios.patch(`https://localhost:7295/api/User/blockorUnblock/${userId}`,{}); 
    console.log(res.data.data)
    return res.data.data;
  }catch(error){
    console.log(error)
  }
})


const initialState={
    users:[],
    userById:null,
    status:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.fulfilled,(state,action)=>{
          console.log(action.payload)
            state.users=action.payload;
        })
        .addCase(fetchUserById.fulfilled,(state,action)=>{
          console.log(action.payload)
          state.userById=action.payload
        }).addCase(blockOrUnblock.fulfilled,(state,action)=>{
          state.status=action.payload;
        })
    }
})

export default userSlice.reducer;
