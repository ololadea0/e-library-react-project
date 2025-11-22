import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Book from "./book";
import "../css/categoriesPage.css";
import useFetchSupabase from "../SupabaseClient";

const CategoryPage = () => {
  const { name } = useParams();
  const { data: books, isPending, error } = useFetchSupabase("books");
  const filteredBooks = books?.filter((book) => book.category === name);

  console.log("Filtered Books:", filteredBooks);

  if (isPending) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="category-page">
      <h1>Books on {name}</h1>
      {filteredBooks?.length ? (
        <Book books={filteredBooks} />
      ) : (
        <div className="no-books">
          <p>No books found in the {name} category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
