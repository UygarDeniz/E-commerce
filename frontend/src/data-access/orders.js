export const fetchOrders = async (page) => {
  const res = await fetch(`/api/order?page=${page}`);

  if (!res.ok) {
    throw new Error('An error occurred while fetching the orders');
  }

  const data = await res.json();
  return data;
};

export const fetchTotalOrders = async () => {
  const res = await fetch('/api/order/total');

  if (!res.ok) {
    throw new Error('An error occurred while fetching the total orders');
  }

  const data = await res.json();
  return data;
};

export const fetchMyOrders = async (page) => {
  const res = await fetch(`/api/order/myorders?page=${page}`);

  if (!res.ok) {
    throw new Error('An error occurred while fetching the orders');
  }

  const data = await res.json();
  return data;
};

export const fetchTotalMyOrders = async () => {
  const res = await fetch('/api/order/myorders/total');

  if (!res.ok) {
    throw new Error('An error occurred while fetching the total orders');
  }

  const data = await res.json();
  return data;
};
