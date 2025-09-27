import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { API_CONFIG } from '../config/api';

export const httpClient = axios.create({
  baseURL: API_CONFIG.baseURL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
