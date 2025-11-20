import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import "../css/library.css";
import SearchBar from "./SearchBar";
import "swiper/css";
import useFetch from "./useFetch";
import Book from "./book";

// import Books from "./book";

export default function Library() {
  const {
    data: booksData,
    isPending,
    error,
  } = useFetch("http://localhost:8000/books/");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchType, setSearchType] = useState("keyword");

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

  // Enhanced scroll reveal animations with staggered effect
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
    <div className="library-page">
      <header>
        <h1>Islamic E-Library</h1>
        <p>
          Explore authentic Islamic books across Tafseer, Hadith, Aqeedah, and
          more.
        </p>
        <SearchBar
          books={books}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
          setFilteredBooks={setFilteredBooks}
        />
      </header>

      {/* Books Section */}
      <Book
        books={filteredBooks && filteredBooks.length ? filteredBooks : books}
        isPending={isPending}
        error={error}
        title={"All Books"}
      />
      {/* Category Section */}
      <Categories title="Categories" />
    </div>
  );
}
