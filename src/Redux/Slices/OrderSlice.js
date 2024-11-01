import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const loadScript = (src) => {
  return new Promise((res) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      res(true);
    };
    script.onerror = () => {
      res(false);
    };

    document.body.appendChild(script);
  });
};

export const generateOrderId = createAsyncThunk(
  "order/generateOrderId",
  async (totalPrice) => {
    try {
      const res = await axios.post(
        `https://localhost:7295/api/Order/Order-create?price=${totalPrice}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const handlePayment = createAsyncThunk(
  "order/handlePayment",
  async (totalPrice, { dispatch }) => {
    try {
      const orderId = await dispatch(generateOrderId(totalPrice));
      if (!orderId) {
        toast.error("Error during RazorPay initialization");
        return;
      }

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast.error("You are offline");
        return;
      }

      const options = {
        order_id: orderId,
        name: "Hatchling Haven",
        description: "Thank you for purchasing",
        handler: async function (res) {
          const paymentData = {
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
          };

          const res = await axios.post(
            "https://localhost:7295/api/Order/payment",
            paymentData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        },
        prefill: {
          name: localStorage.getItem("email"),
          email: localStorage.getItem("email"),
        },
      };
      // let res=await axios.post('https://localhost:7295/api/Order/payment')
    } catch (error) {
      console.log(error);
    }
  }
);

// export const verifyPayment=createAsyncThunk(
//     'order/verifyPayment',
//     async()=>{
//         let res=await axios.post('https://localhost:7295/api/Order/payment',{
//             razorpay_order_id : raz.razorpay_order_id,
//           razorpay_payment_id : raz.razorpay_payment_id,
//           razorpay_signature : raz.razorpay_signature
//         })
//     }
// )

const initialState = {
  orderId: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(generateOrderId.fulfilled, (state, action) => {
      console.log(action.payload);
      state.orderId = action.payload;
    });
  },
});
