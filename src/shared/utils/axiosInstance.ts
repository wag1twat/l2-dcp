import axios from 'axios';
import { isServer, PORT } from '../constants/env';

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((ctx) => {
  const url =
    isServer && ctx.url!.startsWith('/')
      ? `http://localhost:${PORT}${ctx.url}`
      : ctx.url;

  ctx.url = url;

  return ctx;
});

export default axiosInstance;
