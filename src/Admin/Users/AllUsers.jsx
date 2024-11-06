import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../Redux/Slices/OrderSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../Redux/Slices/UserSlice';

function AllUsers() {
  const { users } = useSelector((state) => state.user);
  const [filteredUser, setFilteredUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
   
    if (users) {
      setFilteredUser(users.filter(u => u.role !== 'admin'));
    }
  }, [users]); 

  // console.log(filteredUser);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        All Users
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser.map((u) => (
              <tr key={u?.id} className="border-t border-gray-300 hover:bg-gray-50">
                <td className="py-3 px-6">{u?.id}</td>
                <td className="py-3 px-6">{u?.userName}</td>
                <td className="py-3 px-6">{u?.email}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => navigate(`${u.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
