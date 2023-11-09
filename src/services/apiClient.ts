import axios from "axios";
import { API_BASE_URL } from "../utils/constants/endpoints";

export const protected_api = axios.create({
  baseURL: (import.meta.env.VITE_REACT_APP_API_URL as string) || API_BASE_URL,
});

export const public_api = axios.create({
  baseURL: (import.meta.env.VITE_REACT_APP_API_URL as string) || API_BASE_URL,
});

// add interceptors for protected_api to include access_token / refresh mechanism as per requirement
