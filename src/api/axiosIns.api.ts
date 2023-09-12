import axios, {AxiosInstance} from 'axios';

// Create an instance of Axios with custom configuration
const axiosIns: AxiosInstance = axios.create({
  baseURL: `https://so-nacional.com/v1/`, // Your API base URL
  timeout: 10000,
  timeoutErrorMessage: 'tempo de pedido esgotou!',
  headers: {
    Authorization: '78bf33c31f864f639bb0ddfdddfb4d93',
  },
});

export default axiosIns;
