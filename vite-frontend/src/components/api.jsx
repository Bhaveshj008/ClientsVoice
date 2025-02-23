import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.clientsvoice.in/api',
});

export default api;
