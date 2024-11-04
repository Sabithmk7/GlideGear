import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalProductsPurchased, getTotalRevenue } from '../Redux/Slices/DashboardSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  // const { users, products } = useContext(UserContext);

  // const [totalUsers, setTotalUsers] = useState(0);
  const dispatch=useDispatch();
  const{totalRevenue,totalProductsPurchased}=useSelector(state=>state.dashboard)
  const{users}=useSelector(state=>state.user)
  const totalUsers=users?.length;
  console.log(totalRevenue)
  const{products}=useSelector(state=>state.product)
  const totalProducts=products?.length

  

  useEffect(() => {
    console.log("dsjh")
    dispatch(getTotalRevenue())
    dispatch(getTotalProductsPurchased())
  }, []);

  const userChartData = {
    labels: ['Total Users'],
    datasets: [
      {
        label: 'Users',
        data: [totalUsers],
        backgroundColor: 'rgba(59, 130, 246, 0.5)', 
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const orderChartData = {
    labels: ['Total Orders'],
    datasets: [
      {
        label: 'Orders',
        data: [totalProductsPurchased],
        backgroundColor: 'rgba(250, 204, 21, 0.5)', 
        borderColor: 'rgba(250, 204, 21, 1)',
        borderWidth: 1,
      },
    ],
  };

  const productChartData = {
    labels: ['Total Products'],
    datasets: [
      {
        label: 'Products',
        data: [totalProducts],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const profitChartData = {
    labels: ['Total Profit'],
    datasets: [
      {
        label: 'Profit',
        data: [totalRevenue],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-800 mb-4">{totalUsers||0}</p>
            <div className="w-full max-w-xs">
              <Bar data={userChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">Total Orders</h2>
            <p className="text-3xl font-bold text-yellow-800 mb-4">{totalProductsPurchased||0}</p>
            <div className="w-full max-w-xs">
              <Pie data={orderChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>
          <div className="bg-green-50 border border-green-300 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Total Products</h2>
            <p className="text-3xl font-bold text-green-800 mb-4">{totalProducts||0}</p>
            <div className="w-full max-w-xs">
              <Bar data={productChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>
          <div className="bg-red-50 border border-red-300 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Total Profit</h2>
            <p className="text-3xl font-bold text-red-800 mb-4">₹{totalRevenue?.toFixed(2)||0.00}</p>
            <div className="w-full max-w-xs">
              <Bar data={profitChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
