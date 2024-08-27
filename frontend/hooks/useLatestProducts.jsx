
// old
import { useState, useEffect } from 'react';

export default function useLatestProducts() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    async function getLatestProducts() {
      const res = await fetch('/api/products/latest');
      const data = await res.json();
      setLatestProducts(data);
    }
    getLatestProducts();
  }, []);
  return latestProducts;
}
