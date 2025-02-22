import api from '../../../api';

export const generateForm = async (prompt) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (!token) throw new Error('No token found');

  const { data } = await api.post('/generate-form', { prompt }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createOrEditSpace = async (spaceData, mode) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const url = mode === 'edit' ? '/editSpace' : '/createSpace';
  const method = mode === 'edit' ? 'put' : 'post';
console.log(spaceData)
  const { data } = await api({
    method,
    url,
    data: spaceData,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
