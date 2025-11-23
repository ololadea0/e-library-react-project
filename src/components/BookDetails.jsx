import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import "../css/bookDetails.css";
import useFetchSupabase from "../SupabaseClient";
function BookDetails() {
  const { id } = useParams();
  const { data: books, isPending, error } = useFetchSupabase("books");

  if (!books) return <div className="loading">Loading...</div>;

  const book = books.find((b) => String(b.id) === String(id));

  if (!book) {
    return (
      <div className="book-not-found">
        <h2>Book not found 😕</h2>
        <p>Maybe it’s been moved or renamed. Try checking another category.</p>
      </div>
    );
  }

  const relatedBooks = books
    .filter(
      (b) =>
        b.id !== book.id &&
        (b.category === book.category ||
          b.keywords?.some((k) => book.keywords?.includes(k)))
    )
    .sort(() => Math.random() - 0.5) // randomize
    .slice(0, 4); // show up to 4

  if (isPending) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!books || books.length === 0) return <div>No books available</div>;

  return (
    <div className="book-details-all">
      <section className="book-details">
        <div className="book-main-info">
          <div className="cover-image">
            <img src={book.coverimage} alt={book.title} />
          </div>
          <div className="book-info">
            <div className="info-text">
              <h2>{book.title}</h2>
              <p className="author">
                <strong className="details-bold">Author:</strong> {book.author}
              </p>
              <p className="category">
                <strong className="details-bold">Category:</strong>{" "}
                {book.category}
              </p>
              <p className="category">
                <strong className="details-bold">Language:</strong>{" "}
                {book.language}
              </p>
              <p className="description">{book.longdescription}</p>
            </div>
            <div className="info-buttons">
              <a
                href={book.fileurl}
                target="_blank"
                rel="noopener noreferrer"
                className="read-btn"
              >
                Read Online
              </a>
              <a href={book.fileurl} download className="download-btn">
                Download PDF
              </a>
            </div>
          </div>
        </div>
        {/* <div className="book-pdf-viewer">
          {book.fileurl && (
            <iframe
              src={book.fileurl}
              width="70%"
              height="500px"
              style={{
                marginTop: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          )}
        </div> */}
      </section>

      <section className="related-books">
        <h3>Related Books</h3>
        {relatedBooks.length > 0 ? (
          <div className="related-grid">
            {relatedBooks.map((b) => (
              <Link to={`/library/books/${b.id}`} key={b.id}>
                <img
                  className="related-img-cover"
                  src={b.coverimage}
                  alt={b.title}
                />
                <h4 className="related-title">{b.title}</h4>
                <p className="related-author">{b.author}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-related">No related books found.</p>
        )}
      </section>
    </div>
  );
}
export default BookDetails;
