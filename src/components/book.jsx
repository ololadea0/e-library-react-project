import React, { useEffect } from "react";
import "../css/book.css";
import { Link } from "react-router-dom";

const Book = ({ books, isPending, error, title }) => {
  if (isPending) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  if (!books?.length) return <div className="empty">No books available.</div>;

  useEffect(() => {
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll(".reveal");

      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      });
    };

    const fadeItemsOnScroll = () => {
      const items = document.querySelectorAll(".fade-item");
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          item.style.transitionDelay = `${index * 0.1}s`;
          item.classList.add("visible");
        }
      });
    };

    revealOnScroll();
    fadeItemsOnScroll();

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("scroll", fadeItemsOnScroll);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("scroll", fadeItemsOnScroll);
    };
  }, []);

  return (
    <div className="book-container">
      {title && <h2>{title}</h2>}
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card fade-item" key={book.id}>
            <Link to={`/books/${book.id}`}>
              <img src={book.coverimage} alt={book.title} />
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
