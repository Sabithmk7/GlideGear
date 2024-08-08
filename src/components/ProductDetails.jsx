import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
        setError(null); 
      } catch (error) {
        setError('Error fetching product details');
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p className='h-[65vh] w-[98vw] flex items-center justify-center text-4xl font-bold'>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
     
    </div>
  );
}

export default ProductDetails;
