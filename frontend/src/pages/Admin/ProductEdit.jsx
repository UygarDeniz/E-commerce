import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProductById,
  updateProductById,
} from '../../data-access/products';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  const mutation = useMutation({
    mutationFn: (updatedProduct) =>
      updateProductById( id, updatedProduct ),
    onSuccess: () => {
      queryClient.invalidateQueries(['product', id]);
      navigate('/admin/products');
    },
  });

  const [formState, setFormState] = useState({
    name: '',
    price: '',
    description: '',
    countInStock: '',
    image: '',
    brand: '',
    category: '',
  });

  useEffect(() => {
    if (product) {
      setFormState({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        countInStock: product.countInStock || '',
        image: product.image || '',
        brand: product.brand || '',
        category: product.category || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formState);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product data</div>;

  return (
    <div className='container mx-auto mt-6 shadow-lg py-10 px-16 bg-white rounded-lg mx'>
      <h1 className='text-2xl font-bold mb-6'>Edit Product</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-gray-700 font-semibold'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formState.name}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='price' className='text-gray-700 font-semibold'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={formState.price}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='countInStock' className='text-gray-700 font-semibold'>
            Count In Stock
          </label>
          <input
            type='number'
            id='countInStock'
            name='countInStock'
            value={formState.countInStock}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='description' className='text-gray-700 font-semibold'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={formState.description}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='brand' className='text-gray-700 font-semibold'>
            Brand
          </label>
          <input
            type='text'
            id='brand'
            name='brand'
            value={formState.brand}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='category' className='text-gray-700 font-semibold'>
            Category
          </label>
          <input
            type='text'
            id='category'
            name='category'
            value={formState.category}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='image' className='text-gray-700 font-semibold'>
            Image URL
          </label>
          <input
            type='url'
            id='image'
            name='image'
            value={formState.image}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <button
          type='submit'
          className='te py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
