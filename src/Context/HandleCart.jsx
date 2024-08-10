import axios from "axios";
import { toast } from "react-toastify";

export const handleAddCart = async (item) => {
  const user = localStorage.getItem("id");
  if (user) {
    try {
      const res = await axios.get(`http://localhost:3001/users/${user}`);
      const currentCart = res.data.cart;
      const itemExists = currentCart.find(cartItem => cartItem.id === item.id);
      if (itemExists) {
        toast.info("Item is already in the cart");
      } else {
        const updatedCart = [...currentCart, item];
        await axios.patch(`http://localhost:3001/users/${user}`, { cart: updatedCart });
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


