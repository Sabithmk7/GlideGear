import axios from "axios";
import { toast } from "react-toastify";

export const handleAddCart = async (item) => {
  const user = localStorage.getItem("id");
  if (user) {
    try {
      console.log(user);
      
      const res = await axios.get(`http://localhost:3001/users/${user}`);
      const currentCart = res.data.cart;
      
      const itemExists = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (itemExists) {
        toast.info("Item is already in the cart");
      } else {
        const updatedCart = [...currentCart, item];
        await axios.patch(`http://localhost:3001/users/${user}`, {
          cart: updatedCart,
        });
        toast.success("Item successfully added to cart");
      }
    } catch (error) {
      toast.warning("Something went wrong");
      console.log(error);
    }
  } else {
    toast.warning("Please Login");
  }
};

export const handleRemove = async (item) => {
  const userId = localStorage.getItem("id");
  if (!userId) {
    toast.warning("Please Login");
    return;
  }
  try {
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    const currentCart = response.data.cart;

    const updatedCart = currentCart.filter(
      (cartItem) => cartItem.id !== item.id
    );

    await axios.patch(`http://localhost:3001/users/${userId}`, {
      cart: updatedCart,
    });
    toast.success("Item removed from cart");
  } catch (error) {
    toast.error("Failed to remove item from cart");
    console.error(error);
  }
};
