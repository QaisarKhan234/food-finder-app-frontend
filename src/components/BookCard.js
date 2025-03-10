import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="col-md-4 mb-3 d-flex">
      <div className="card flex-grow-1 d-flex flex-column">
        <div className="card-body">
          <h5 className="card-title" >{book.title}</h5>
          <p className="card-text">Author: {book.author}</p>
        </div>
        <div className="card-footer bg-white border-0 mt-auto">
          <a href={`/books/${book._id}`} className="btn btn-primary w-100">View Details</a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
