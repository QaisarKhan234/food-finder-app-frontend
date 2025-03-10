import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(token);
        console.log('favorites', data)
        setFavorites(data);
      } catch (error) {
        alert('Failed to load favorites!');
      }
    };
    fetchFavorites();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id, token);
      setFavorites(favorites.filter(book => book._id !== id));
    } catch (error) {
      alert('Failed to remove favorite!');
    }
  };

  return (
    <div className="container">
      <h2>Your Favorite Books</h2>
      {favorites.length === 0 ? <p>No favorites yet.</p> : (
        <ul className="list-group">
          {favorites.map(book => (
            <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
              {book.title}
              <button onClick={() => handleRemove(book._id)} className="btn btn-danger btn-sm">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
