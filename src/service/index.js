import axios from 'axios';

const api = axios.create({
  baseURL: 'https://avalia-mt-dev-api.educat.net.br',
});

export default api;
