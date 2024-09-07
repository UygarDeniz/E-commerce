import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../data-access/products';

function ProductNew() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      navigate('/admin/products');
    },
  });

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    countInStock: '',
    image: '',
    brand: '',
    category: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProductMutation.mutate(product);
  };

  return (
    <div className='container mx-auto px-4 mt-6'>
      <h1 className='text-2xl font-bold mb-4'>New Product</h1>
      <form onSubmit={handleSubmit}>
        <label className='block'>
          <span className='text-gray-700'>Name</span>
          <input
            type='text'
            name='name'
            value={product.name}
            onChange={handleChange}
            className='mt-1 py-3 px-1  block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
        <label className='block mt-4'>
          <span className='text-gray-700'>Price</span>
          <input
            type='number'
            name='price'
            value={product.price}
            onChange={handleChange}
            className='mt-1 py-3 px-1  block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
        <label className='block mt-4'>
          <span className='text-gray-700'>Count In Stock</span>
          <input
            type='number'
            name='countInStock'
            value={product.countInStock}
            onChange={handleChange}
            className='mt-1 py-3 px-1  block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
        <label className='block'>
          <span className='text-gray-700'>Description</span>
          <input
            type='text'
            name='description'
            value={product.description}
            onChange={handleChange}
            className='mt-1  py-3 px-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
        <label className='block'>
          <span className='text-gray-700'>Brand</span>
          <input
            type='text'
            name='brand'
            value={product.brand}
            onChange={handleChange}
            className='mt-1  py-3 px-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
        <label className='block'>
          <span className='text-gray-700'>Category</span>
          <input
            type='text'
            name='category'
            value={product.category}
            onChange={handleChange}
            className='mt-1  py-3 px-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
        <label className='block'>
          <span className='text-gray-700'>İmage</span>
          <input
            type='text'
            name='image'
            value={product.image}
            onChange={handleChange}
            className='mt-1 py-3 px-1 block w-full rounded-md border-gray-300 shadow-sm'
          />
        </label>
        <button
          type='submit'
          className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create New Product
        </button>
      </form>
    </div>
  );
}

export default ProductNew;
