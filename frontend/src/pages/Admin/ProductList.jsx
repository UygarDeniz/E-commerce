import { Link } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import {
  fetchAllProducts,
  deleteProductById,
} from '../../data-access/products';
function ProductList() {
  const queryClient = useQueryClient();
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: 'products',
    queryFn: fetchAllProducts,
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId) => deleteProductById(productId),
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  if (isPending) {
    return (
      <div className='min-h-screen'>
        <Loading />
      </div>
    );
  }
  if (isError) {
    return (
      <div className='min-h-screen'>
        <p className='text-red-500'>
          An error occurred while fetching the products
        </p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 mt-6'>
      <div className='flex content-end'>
        <h1 className='text-2xl font-bold mb-4'>Products</h1>

        <Link to='/admin/products/create' className='ml-auto '>
          <FaPlus className='text-4xl' />
        </Link>
      </div>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>CountInStock</th>
            <th className='px-4 py-2'>Edit</th>
            <th className='px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className='bg-gray-100'>
              <td className='border px-4 py-2'>{product.name}</td>
              <td className='border px-4 py-2'>{product.price}</td>
              <td className='border px-4 py-2'>{product.countInStock}</td>
              <td className='border px-4 py-2'>
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className='text-blue-500 hover:text-blue-700'
                >
                  <FaEdit className='text-2xl' />
                </Link>
              </td>
              <td className='border px-4 py-2'>
                <FaTrash
                  className='text-red-500 hover:text-red-700 text-2xl cursor-pointer'
                  onClick={() => deleteProductMutation.mutate(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductList;
