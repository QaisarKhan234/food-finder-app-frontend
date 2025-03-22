import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Auth APIs
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Book APIs
export const fetchBooks = async (query = '') => {
  try {
    const url = query ? `${API_URL}/books?search=${query}` : `${API_URL}/books`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch books:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const fetchBookDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch book details:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Favorites APIs (protected)
export const getFavorites = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch favorites:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const addFavorite = async (bookId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/favorites/addtofav`,
      { bookId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("add fav", response)
    return response.data;
  } catch (error) {
    console.error('Failed to add favorite:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const removeFavorite = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to remove favorite:', error.response?.data?.message || error.message);
    throw error;
  }
};


