export const fetchProfileById = async (userId) => {
  const res = await fetch(`/api/auth/profile/${userId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  const data = await res.json();
  return data;
};

export const updateProfileById = async (userId, username, email) => {
  const res = await fetch(`/api/auth/profile/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email }),
  });
  const data = await res.json();
  if (!res.ok) {
    if (data?.message) {
      throw new Error(data.message);
    } else {
      throw new Error('Failed to update profile');
    }
  }
  return data;
};
