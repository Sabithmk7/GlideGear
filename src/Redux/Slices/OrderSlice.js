// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const loadScript = (src) => {
//   return new Promise((res) => {
//     const script = document.createElement("script");
//     script.src = src;

//     script.onload = () => {
//       res(true);
//     };
//     script.onerror = () => {
//       res(false);
//     };

//     document.body.appendChild(script);
//   });
// };

// export const generateOrderId = createAsyncThunk(
//   "order/generateOrderId",
//   async (totalPrice) => {
//     try {
//       const res = await axios.post(
//         `https://localhost:7295/api/Order/Order-create?price=${totalPrice}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       console.log("gener"+res)
//       return res.data;
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// );

// const verifyPayment = async (paymentData) => {
//   try {
//     const res = await axios.post("https://localhost:7295/api/Order/payment", paymentData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     console.log("rees ver"+res)
//     return res.data.success; // Assume API responds with success status
//   } catch (error) {
//     console.error("Payment verification failed:", error);
//     return false;
//   }
// };


// export const handlePayment = createAsyncThunk(
//   "order/handlePayment",
//   async (totalPrice, { dispatch }) => {
//     try {
//       const orderId = await dispatch(generateOrderId(totalPrice)).unwrap();
//       if (!orderId) {
//         toast.error("Error during RazorPay initialization");
//         return false; // Return false if initialization fails
//       }
//       console.log(orderId)

//       const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//       if (!res) {
//         toast.error("You are offline");
//         return false;
//       }
//       console.log("bool"+res)

//       return new Promise((resolve) => {
//         const options = {
//           order_id: orderId,
//           amount: totalPrice,
//           name: "GlideGear",
//           description: "Thank you for purchasing",
//           handler: async function (res) {
//             const paymentData = {
//               razorpay_order_id: res.razorpay_order_id,
//               razorpay_payment_id: res.razorpay_payment_id,
//               razorpay_signature: res.razorpay_signature,
//             };
//             const verified = await verifyPayment(paymentData);
//             resolve(verified); // Resolve promise with the verification result
//           },
//           prefill: {
//             name: localStorage.getItem("name"),
//             email: localStorage.getItem("email"),
//           },
//         };

//         const paymentObject = new window.Razorpay(options);
//         console.log(paymentObject)
//         paymentObject.open();
//       });
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   }
// );


// export const submitOrder = createAsyncThunk(
//   "order/submitOrder",
//   async ({ orderDetails, totalPrice }, { dispatch }) => {
//     try {
//       const payStatus = await dispatch(handlePayment(totalPrice)).unwrap();
//       console.log(payStatus+"paystat")
//       if (payStatus) {
//         let res = await axios.post("https://localhost:7295/api/Order/place-order", orderDetails, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         toast.success("Order placed successfully!");
//         return res.data;
//       } else {
//         toast.error("Payment verification failed. Order not placed.");
//         return null;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );



// // export const verifyPayment=createAsyncThunk(
// //     'order/verifyPayment',
// //     async()=>{
// //         let res=await axios.post('https://localhost:7295/api/Order/payment',{
// //             razorpay_order_id : raz.razorpay_order_id,
// //           razorpay_payment_id : raz.razorpay_payment_id,
// //           razorpay_signature : raz.razorpay_signature
// //         })
// //     }
// // )

// const initialState = {
//   orderId: null,
// };
// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(generateOrderId.fulfilled, (state, action) => {
//       console.log(action.payload);
//       state.orderId = action.payload;
//     });
//   },
// });


// export default orderSlice.reducer;