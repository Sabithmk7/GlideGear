import React, { useEffect  } from "react";
// import { UserContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchyourOrder } from "../Redux/Slices/OrderSlice";

function Order() {
  // const { users } = useContext(UserContext);
  // const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.yourOrder);

  useEffect(() => {
    dispatch(fetchyourOrder());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-4 md:p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center text-lg">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Order ID: {order.orderId}</h2>
                <p className="text-sm text-gray-600">
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {order.orderStatus || "Pending"}
                </p>
                <div className="my-4">
                  <ul className="divide-y divide-gray-200">
                    <li key={order.id} className="py-2 flex items-center">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-16 h-16 object-cover rounded border mr-3"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium">{order.productName}</p>
                        <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold">₹{order.totalPrice}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <p className="text-lg font-bold text-right mt-4">Total: ${order.totalPrice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Order;
