import React, { useEffect } from "react";
import "../css/book.css";
import { Link } from "react-router-dom";

const Book = ({ books, isPending, error, title }) => {
  if (isPending) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  if (!books?.length) return <div className="empty">No books available.</div>;

  return (
    <div className="book-container">
      {title && <h2>{title}</h2>}
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card fade-item" key={book.id}>
            <Link to={`/books/${book.id}`}>
              <img src={book.coverImage} alt={book.title} />
              <h3>{book.title}</h3>
              <h4> {book.author}</h4>
              <p className="description">{book.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
