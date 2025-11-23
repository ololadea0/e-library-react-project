import { useState, useEffect } from "react";

import useFetchSupabase from "../SupabaseClient";
import Message from "./Message";
import useMessage from "./UseMessage";
import { supabase } from "./supabaseClient";

const DeleteBook = () => {
  const { data: books, isPending, error } = useFetchSupabase("books");
  const [localBooks, setLocalBooks] = useState([]);
  const { message, type, showMessage } = useMessage();

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
      const { error: deleteError } = await supabase
        .from("books")
        .delete()
        .eq("id", targetId);

      if (deleteError) {
        showMessage("Failed to delete book", "error");
        throw deleteError;
      }

      console.log("Book deleted successfully");
      showMessage("Book deleted successfully", "success");

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
          <div>
            <Message message={message} type={type} />
          </div>
        </ul>
      )}
    </div>
  );
};

export default DeleteBook;
