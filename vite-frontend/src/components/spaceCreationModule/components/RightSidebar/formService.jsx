import api from '../../../api';

export const generateForm = async (prompt) => {
  const token = localStorage.getItem('token');
<<<<<<< HEAD
  console.log(token)
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
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
