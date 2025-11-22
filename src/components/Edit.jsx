import { useEffect, useState } from "react";
import AdminBookList from "../components/AdminBookList";
import { useNavigate } from "react-router-dom";
import useFetchSupabase from "../SupabaseClient";

const Edit = () => {
  const navigate = useNavigate();

  const { data, isPending, error: fetchError } = useFetchSupabase("books");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
      setIsLoading(false);
    } else if (!isPending && data) {
      setBooks(data);
      setIsLoading(false);
    }
  }, [data, isPending, fetchError]);

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
