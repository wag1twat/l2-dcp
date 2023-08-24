import axios from 'axios';
import { isServer, PORT } from '../constants/env';

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((ctx) => {
  ctx.url =
    isServer && ctx.url!.startsWith('/')
      ? `http://localhost:${PORT}${ctx.url}`
      : ctx.url;

  return ctx;
});

export default axiosInstance;
