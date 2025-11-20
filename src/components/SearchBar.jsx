import React, { useState, useEffect } from "react";

const SearchBar = ({
  books = [],
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  setFilteredBooks,
}) => {
  const [activeFilter, setActiveFilter] = useState(null); // Track active filter to display after selection

  const handleSelect = (item) => {
    // item might be a book object (keyword) or a string value (category/language)
    if (searchType === "keyword") {
      // item is a book object
      const term = item.title.toLowerCase();
      const matches = books.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          b.author.toLowerCase().includes(term) ||
          b.description.toLowerCase().includes(term)
      );
      setActiveFilter({ type: "keyword", value: item.title });
      setSearchTerm(""); // Clear to hide suggestions
      setFilteredBooks(matches);
    } else {
      // item is a string like "English" or "Hadith"
      const value = String(item).toLowerCase();
      const matches = books.filter((b) => {
        if (Array.isArray(b[searchType])) {
          // If it's an array, check if the value is IN the array
          return b[searchType]
            .map((v) => String(v).toLowerCase())
            .includes(value);
        } else {
          // If it's a string, do an exact match
          return String(b[searchType] || "").toLowerCase() === value;
        }
      });
      setActiveFilter({ type: searchType, value: item });
      setSearchTerm(""); // Clear to hide suggestions
      setFilteredBooks(matches);
    }
  };

  // Build suggestions according to searchType rules
  const term = (searchTerm || "").toLowerCase().trim();

  let filteredSuggestions = [];

  if (books && term) {
    const filtered = books.filter((book) => {
      if (searchType === "keyword") {
        return (
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.description.toLowerCase().includes(term)
        );
      }
      if (searchType === "category") {
        return book.category.toLowerCase().includes(term);
      }
      if (searchType === "language") {
        // Handle both string and array language formats
        if (Array.isArray(book.language)) {
          // Check if ANY language in the array starts with the search term
          return book.language.some((lang) =>
            String(lang || "")
              .toLowerCase()
              .includes(term)
          );
        } else {
          return String(book.language || "")
            .toLowerCase()
            .includes(term);
        }
      }
      return false;
    });

    if (searchType === "keyword") {
      // show every matching book (no uniqueness collapse)
      filteredSuggestions = filtered;
    } else {
      // show unique values for category/language (but keep them as strings)
      const allValues = [];
      filtered.forEach((b) => {
        const value = b[searchType];
        if (Array.isArray(value)) {
          // Only add languages that match the search term
          if (searchType === "language") {
            const matchingLangs = value.filter((v) =>
              String(v || "")
                .toLowerCase()
                .includes(term)
            );
            allValues.push(...matchingLangs);
          } else {
            allValues.push(...value);
          }
        } else {
          allValues.push(value);
        }
      });
      const uniqueValues = Array.from(new Set(allValues));
      filteredSuggestions = uniqueValues; // array of strings
    }
  }

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="keyword">Keyword</option>
          <option value="category">Category</option>
          <option value="language">Language</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {term && (
          <div className="search-results">
            {filteredSuggestions.length > 0 ? (
              <ul>
                {searchType === "keyword"
                  ? // keyword: suggestions are book objects
                    filteredSuggestions.map((book) => (
                      <li key={book.id} onClick={() => handleSelect(book)}>
                        {book.title}{" "}
                        <small style={{ color: "#666" }}>
                          {" "}
                          — {book.author}
                        </small>
                      </li>
                    ))
                  : // category/language: suggestions are unique strings
                    filteredSuggestions.map((value) => (
                      <li key={value} onClick={() => handleSelect(value)}>
                        {value}
                      </li>
                    ))}
              </ul>
            ) : (
              <p className="no-match">No match found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
