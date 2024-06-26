import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1'; // Adjust the port if different

// User API
export const signUp = (userData) => axios.post(`${API_URL}/users`, userData);
export const signIn = (credentials) => axios.post(`${API_URL}/auth`, credentials);

// Product API
export const searchProducts = (query) => axios.get(`${API_URL}/products?search=${query}`);
export const getCategories = () => axios.get(`${API_URL}/products/categories`);
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProduct = (id) => axios.get(`${API_URL}/products/${id}`);

// Order API
export const createOrder = (orderData) => axios.post(`${API_URL}/orders`, orderData);
export const addAddress = (addressData) => axios.post(`${API_URL}/addresses`, addressData);
