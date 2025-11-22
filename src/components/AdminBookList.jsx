const AdminBookList = ({ books, onEdit }) => {
  return (
    <div className="admin-booklist">
      <h2>All Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="admin-books-grid">
          {books.map((book) => (
            <div className="admin-book-card" key={book.id}>
              <img
                src={book.coverimage}
                alt={book.title}
                className="admin-book-cover"
              />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button onClick={() => onEdit(book.id)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookList;
