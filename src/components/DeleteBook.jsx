import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const DeleteBook = () => {
  const {
    data: books,
    isPending,
    error,
  } = useFetch("http://localhost:8000/books");
  const [localBooks, setLocalBooks] = useState([]);

  // Keep local copy synced with fetched books
  useEffect(() => {
    if (books) setLocalBooks(books);
  }, [books]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    const targetId = String(id);
    try {
      const res = await fetch(`http://localhost:8000/books/${targetId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete book (status ${res.status})`);
      }

      console.log("Book deleted successfully");

      // update local state so UI syncs instantly
      setLocalBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  if (isPending) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="delete-book">
      <h2>Delete a Book</h2>
      {localBooks.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {localBooks.map((book) => (
            <li key={book.id}>
              <div className="book-t-a">
                <strong>{book.title}</strong> by {book.author}
              </div>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteBook;
