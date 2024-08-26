import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useLatestProducts from '../../hooks/useLatestProducts';
function Home() {
  const latestProducts = useLatestProducts();

  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className='mySwiper mt-14'
      >
        <SwiperSlide className='flex justify-center'>
          <img
            src='https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='Slide 1'
          />
        </SwiperSlide>
        <SwiperSlide className='flex  justify-center'>
          <img
            src='https://images.pexels.com/photos/2237456/pexels-photo-2237456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='Slide 2'
          />
        </SwiperSlide>
        <SwiperSlide className='flex  justify-center'>
          <img
            src='https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='Slide 3'
          />
        </SwiperSlide>
        <SwiperSlide className='flex  justify-center'>
          <img
            src='https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='Slide 4'
          />
        </SwiperSlide>
      </Swiper>

      <section className='mt-40 mx-20'>
        <h2 className='font-bold text-7xl text-center'>
          <span className='text-red-600'>Discover</span> Latest Products{' '}
        </h2>

        <div className='mt-10  grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
          {latestProducts.map((product) => {
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
    </div>
  );
}

export default Home;
