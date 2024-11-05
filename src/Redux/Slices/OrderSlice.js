import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders=createAsyncThunk('order/fetchOrders',async()=>{
    try{
        const res=await axios.get('https://localhost:7295/api/Order/get-order-details-admin',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        console.log(res)
        return res.data;
    }catch(error){
        console.log(error)
    }
})

export const fetchUserOrder=createAsyncThunk('order/fetchUserOrder',async(userId)=>{
    try{
        const res=await axios.get(`https://localhost:7295/api/Order/${userId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        console.log(res.data)
        return res.data.data;
    }catch(error){
        console.log(error)
    }
})

export const fetchyourOrder=createAsyncThunk('order/fetchyourOrder',async()=>{
    try{
        const res=await axios.get(`https://localhost:7295/api/Order/getOrderDetails`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        console.log(res.data)
        return res.data;
    }catch(error){
        console.log(error)
    }
})



const initialState={
    userOrder:[],
    adminOrderDetails:[],
    yourOrder:[],
    error:null
}

const orderSlice=createSlice({
    name:'order',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchOrders.pending,(state,action)=>{
            console.log("loading")
        }).addCase(fetchOrders.fulfilled,(state,action)=>{
            state.adminOrderDetails=action.payload
            console.log(action.payload)
        }).addCase(fetchOrders.rejected,(state,action)=>{
            console.log(action.error)
        }).addCase(fetchUserOrder.fulfilled,(state,action)=>{
            state.userOrder=action.payload
        }).addCase(fetchyourOrder.fulfilled,(state,action)=>{
            state.yourOrder=action.payload;
        })
    }
})

export default orderSlice.reducer;