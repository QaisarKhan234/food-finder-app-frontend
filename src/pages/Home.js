import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchBooks, addFavorite } from '../api/api';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadBooks();
  }, [searchQuery]);

  const loadBooks = async () => {
    try {
      const data = await fetchBooks(searchQuery);
      setBooks(data);
    } catch (error) {
      console.error('Failed to load books:', error);
    }
  };

  const handleAddToFavorites = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      await addFavorite(bookId, token);
      alert('Book added to favorites!');
    } catch (error) {
      console.error('Failed to add to favorites:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Welcome to Book Finder App</h2>

      {/* Real-time Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Book List */}
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToFavorites(book._id)}
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
