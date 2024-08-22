import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const { users, products } = useContext(UserContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const totalProductsCount = products.length;
    const userCount = users.filter((u) => !u.admin).length;
    const orderCount = users.reduce((a, user) => {
      if (user.orders && user.orders.length > 0) {
        return a + user.orders.length;
      }
      return a;
    }, 0);

    const totalProfit = users.reduce((total, user) => {
      if (user.orders && user.orders.length > 0) {
        const userOrderTotal = user.orders.reduce((sum, order) => {
          return sum + parseFloat(order.amount);
        }, 0);
        return total + userOrderTotal;
      }
      return total;
    }, 0);

    setTotalProducts(totalProductsCount);
    setTotalUsers(userCount);
    setTotalOrders(orderCount);
    setTotalProfit(totalProfit);
  }, [users, products]);

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
        data: [totalOrders],
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
        data: [totalProfit],
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
            <p className="text-3xl font-bold text-blue-800 mb-4">{totalUsers}</p>
            <div className="w-full max-w-xs">
              <Bar data={userChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">Total Orders</h2>
            <p className="text-3xl font-bold text-yellow-800 mb-4">{totalOrders}</p>
            <div className="w-full max-w-xs">
              <Pie data={orderChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>
          <div className="bg-green-50 border border-green-300 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Total Products</h2>
            <p className="text-3xl font-bold text-green-800 mb-4">{totalProducts}</p>
            <div className="w-full max-w-xs">
              <Bar data={productChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </div>
          </div>
          <div className="bg-red-50 border border-red-300 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Total Profit</h2>
            <p className="text-3xl font-bold text-red-800 mb-4">${totalProfit.toFixed(2)}</p>
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
