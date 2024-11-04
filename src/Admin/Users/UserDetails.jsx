import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { blockOrUnblock, fetchUserById } from '../../Redux/Slices/UserSlice';
import { fetchUserOrder } from '../../Redux/Slices/OrderSlice';

function UserDetails() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { userById,status } = useSelector(state => state.user);
    const { userOrder } = useSelector(state => state.order);
    console.log(status)
    
    useEffect(() => {
        dispatch(fetchUserById(userId));
        dispatch(fetchUserOrder(userId));
    }, [dispatch, userId]);

    const handleBlockUnblock = (userId) => {
        dispatch(blockOrUnblock(userId));
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg space-y-8">
            {/* User Details Section */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">User Details</h2>
                <div className="space-y-2">
                    <p><strong>Email:</strong> {userById?.email}</p>
                    <p><strong>User ID:</strong> {userById?.id}</p>
                    <p><strong>Username:</strong> {userById?.userName}</p>
                    <p><strong>Status:</strong> <span className={`text-sm font-semibold ${status?.isBlocked  ? 'text-red-500' : 'text-green-500'}`}>
                        {status?.isBlocked ? "Blocked" : "Active"}
                    </span></p>
                </div>
                <button 
                    onClick={()=>handleBlockUnblock(userById?.id)}
                    className={`mt-6 px-6 py-2 rounded-lg font-semibold transition duration-200 ease-in-out 
                        ${status?.isBlocked ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                >
                    {status?.isBlocked ? "Unblock User" : "Block User"}
                </button>
            </div>

            {/* User Orders Section */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">User Orders</h3>
                {userOrder.length === 0 ? (
                    <p className="text-gray-500">No orders found for this user.</p>
                ) : (
                    userOrder.map(order => (
                        <div key={order?.id} className="border rounded-lg p-6 mb-4 bg-gray-50 shadow-sm">
                            <h4 className="font-semibold text-lg text-gray-700 mb-2">Order ID: {order?.orderId}</h4>
                            <p className="text-sm text-gray-600">Order Date: {new Date(order?.orderDate).toLocaleString()}</p>
                            <p className="text-lg font-medium text-gray-800 mt-2">
                                Total Amount: ${order?.orderProducts.reduce((acc, item) => acc + item.totalAmount, 0).toFixed(2)}
                            </p>
                            <div className="flex flex-wrap mt-4 gap-4">
                                {order?.orderProducts.map(product => (
                                    <div key={product?.productId} className="border rounded-lg p-3 bg-white shadow-sm max-w-[140px] text-center">
                                        <img src={product?.productImage} alt={product?.productName} className="w-full h-24 object-cover mb-2 rounded" />
                                        <p className="text-sm font-medium text-gray-700">{product?.productName}</p>
                                        <p className="text-xs text-gray-500">Price: ${product?.price.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">Qty: {product?.quantity}</p>
                                        <p className="text-xs font-semibold text-gray-800">Total: ${product?.totalAmount.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserDetails;