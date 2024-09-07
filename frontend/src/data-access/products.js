export const fetchAllProducts = async () => {
  const res = await fetch('/api/products');

  if (!res.ok) {
    throw new Error('An error occurred while fetching the products');
  }

  const data = await res.json();
  return data;
};

export const fetchLatestProducts = async () => {
  const res = await fetch('/api/products/latest');

  if (!res.ok) {
    throw new Error('An error occurred while fetching the latest products');
  }

  const data = await res.json();
  return data;
};

export const fetchProductBySearchTerm = async (term) => {
  const res = await fetch(`/api/products/search/${term}`);

  if (!res.ok) {
    throw new Error('An error occurred while fetching the products');
  }

  const data = await res.json();
  return data;
};

export const fetchProductById = async (id) => {
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) {
    throw new Error('An error occurred while fetching the product');
  }

  const data = await res.json();
  return data;
};

export const updateProductById = async (id, product) => {
  console.log(id);
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error('An error occurred while updating the product');
  }
  return res.json();
};

export const deleteProductById = async (id) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('An error occurred while deleting the product');
  }
  return res.json();
};
export const createProduct = async (product) => {
    const res = await fetch(`/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    
    if (!res.ok) {
        throw new Error('An error occurred while creating the product');
    }
    
    return res.json();
    }
