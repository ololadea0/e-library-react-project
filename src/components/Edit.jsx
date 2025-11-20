import { useEffect, useState } from "react";
import AdminBookList from "../components/AdminBookList";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
        console.error("Error fetching books:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  if (isLoading) return <div className="loading">Loading Books ...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-page">
      <AdminBookList books={books} onEdit={handleEdit} />
    </div>
  );
};

export default Edit;
