import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { fetchProductBySearchTerm } from '../data-access/products';
import Loading from '../components/Loading';
function SearchResult() {
  const { term } = useParams();
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['search', term],
    queryFn: () => fetchProductBySearchTerm(term),
  });
  
  if (isError) {
    return (
      <div className='mt-20 w-full text-center text-2xl font-bold text-red-500'>
        Error fetching data
      </div>
    );
  }
  return (
    <div className='p-4 mt-10'>
      <h1 className='mx-20 text-2xl font-bold mb-10'>
        Search results for {term}:
      </h1>
      {isPending ? (
        <Loading />
      ) : products?.length > 0 ? (
        <section className='mt-10 mx-20'>
          <div className='mt-10  grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  image={product.image}
                  brand={product.brand}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <div className='text-center text-xl font-bold'>No products found</div>
      )}
    </div>
  );
}

export default SearchResult;
