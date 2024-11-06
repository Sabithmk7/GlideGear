import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getWishList=createAsyncThunk('wishlist/getWishlist',async()=>{
    try{
        const res=await axios.get('https://localhost:7295/api/WhishList/GetWhishList',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        
        return res.data
    }catch(error){
        toast.error(error.message)
    }
})

export const addRemoveWishlist=createAsyncThunk('wishlist/addRemoveWishlist',async(productId,{dispatch})=>{
    try{
        const res=await axios.post(`https://localhost:7295/api/WhishList/AddOrRemove/${productId}`,{},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        dispatch(getWishList())
        return res.data;
    }catch(error){
        toast.error(error.message)
    }
})

const initialState={
    wishlistItems:[],
    message:null
}

const wishlistSlice=createSlice({
    name:'wishlist',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getWishList.fulfilled,(state,action)=>{
            state.wishlistItems=action.payload.data
        }).addCase(addRemoveWishlist.fulfilled,(state,action)=>{
            state.message=action.payload.message
        })
    }
})

export default wishlistSlice.reducer;