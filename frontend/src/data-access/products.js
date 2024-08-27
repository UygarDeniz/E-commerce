export const fetchLatestProducts = async () => {
  const response = await fetch('/api/products/latest');

  if (!response.ok) {
    throw new Error('An error occurred while fetching the latest products');
  }

  const data = await response.json();
  return data;
};
