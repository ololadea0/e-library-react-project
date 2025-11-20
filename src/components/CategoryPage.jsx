import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Book from "./book";
import "../css/categoriesPage.css";

const CategoryPage = () => {
  const { name } = useParams();
  const {
    data: books,
    isPending,
    error,
  } = useFetch("http://localhost:8000/books");
  const filteredBooks = books?.filter((book) => book.category === name);

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
