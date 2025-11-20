import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import Book from "./book";
import Categories from "./Categories";
import "../css/home.css";

function Home() {
  const {
    data: booksData,
    isPending: loading,
    error,
  } = useFetch("http://localhost:8000/books");
  const heroRef = useRef(null);

  // Shuffle books array for random display
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const books = booksData ? shuffleArray(booksData) : [];

  // Hero parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty(
        "--mx",
        (x * 12).toFixed(2) + "px"
      );
      document.documentElement.style.setProperty(
        "--my",
        (y * 12).toFixed(2) + "px"
      );
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Global scroll reveal
  useEffect(() => {
    const selector = "section, .book, .category-card, .cta-section";
    const elements = Array.from(document.querySelectorAll(selector));
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => {
      el.classList.add("reveal-init");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  // Enhanced scroll reveal animations with staggered effect
  useEffect(() => {
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll(".reveal");

      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100; // trigger when 100px from bottom of viewport

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
          // Add staggered delay for each item
          item.style.transitionDelay = `${index * 0.1}s`;
          item.classList.add("visible");
        }
      });
    };

    // Run on mount to catch already-visible sections
    revealOnScroll();
    fadeItemsOnScroll();

    // Add scroll listener
    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("scroll", fadeItemsOnScroll);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("scroll", fadeItemsOnScroll);
    };
  }, []);

  if (error)
    return (
      <div className="error-state">Error loading books. Please try again.</div>
    );

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero-section fade-item" ref={heroRef}>
        <div className="hero-content">
          <h1>Your Digital Library for Authentic Islamic Books</h1>
          <p>
            A digital library of authentic islamic books to guide and inspire
            the Ummah
          </p>
          <Link to="/library" className="cta-button">
            Explore Books
          </Link>
          <div className="floating-books" aria-hidden="true">
            {books &&
              books
                .slice(0, 3)
                .map((b) => <img key={b.id} src={b.coverImage} alt="" />)}
          </div>
        </div>

        {/* Floating book thumbnails */}
      </section>

      {/* Featured Books */}
      <section className="featured-section reveal-init">
        <h2>Featured Books</h2>
        {loading ? (
          <p className="loading">Loading books...</p>
        ) : (
          <div className="books-grid">
            {books?.slice(0, 4).map((book) => (
              <div key={book.id} className="book-card fade-item">
                <Link to={`/books/${book.id}`}>
                  <img src={book.coverImage} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </Link>
              </div>
            )) || <p>No books found</p>}
          </div>
        )}
      </section>

      {/* Categories Showcase — using your Category component */}
      <section className="categories-showcase reveal-init fade-item">
        <Categories books={books || []} title="Browse by Category" />
      </section>

      {/* About / Mission */}
      <section className="about-section reveal-init">
        <h2>Our Mission</h2>
        <p>
          We believe Islamic knowledge should be accessible to everyone. Our
          e-library provides authentic, curated Islamic texts free of charge,
          making spiritual learning convenient and meaningful for all seekers.
        </p>
      </section>

      {/* Call-to-Action */}
      <section className="cta-section reveal-init">
        <h3>Start Your Learning Journey</h3>
        <p>Access hundreds of Islamic books, instantly and freely.</p>
        <Link to="/library" className="cta-button primary">
          Browse Full Library
        </Link>
      </section>
    </main>
  );
}

export default Home;
