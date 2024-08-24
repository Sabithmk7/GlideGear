import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className='text-4xl font-bold'>404 NotFound</h1>
      <button className='p-4 border-2' onClick={()=>navigate('/')}>Back Home</button>
    </div>
  );
}

export default NotFound;
