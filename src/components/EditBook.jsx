import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UploadPdf, uploadImageTwo } from "../utiltities/Uploader";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [coverImage, setCoverImage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setCoverImage(data.coverImage || "");
        setFileUrl(data.fileUrl || "");
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkbox (multiple selection for language)
      setBook((prev) => {
        const currentLanguages = Array.isArray(prev[name]) ? prev[name] : [];
        if (checked) {
          return { ...prev, [name]: [...currentLanguages, value] };
        } else {
          return {
            ...prev,
            [name]: currentLanguages.filter((lang) => lang !== value),
          };
        }
      });
    } else {
      // Handle regular input/select
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsPending(true);
    const uploadedUrl = await uploadImageTwo(file); // call your uploader function here
    if (uploadedUrl) {
      setBook((prev) => ({ ...prev, coverImage: uploadedUrl }));
    }
    setIsPending(false);
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsPending(true);
    const uploadedUrl = await UploadPdf(file);
    if (uploadedUrl) {
      setBook((prev) => ({ ...prev, fileUrl: uploadedUrl }));
    }
    setIsPending(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch(`http://localhost:8000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then(() => {
        setIsPending(false);
        navigate("/admin"); // back to admin dashboard or book list
      })
      .catch((err) => {
        console.error("Error updating book:", err);
        setIsPending(false);
      });
  };

  if (isPending && !book) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-book">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <label>Book Author</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <label>Category</label>
        <select
          name="category"
          value={book.category}
          onChange={handleChange}
          required
        >
          <option value="Tafsir">Tafsir</option>
          <option value="Hadith">Hadith</option>
          <option value="Fiqh">Fiqh</option>
          <option value="Aqeedah">Aqeedah</option>
          <option value="Adhkaar">Adhkaar</option>
          <option value="History">History</option>
        </select>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend>Language</legend>
          <div className="language-options">
            <label>
              <input
                type="checkbox"
                name="language"
                value="English"
                checked={
                  Array.isArray(book.language)
                    ? book.language.includes("English")
                    : book.language === "English"
                }
                onChange={handleChange}
              />
              English
            </label>
            <label>
              <input
                type="checkbox"
                name="language"
                value="Arabic"
                checked={
                  Array.isArray(book.language)
                    ? book.language.includes("Arabic")
                    : book.language === "Arabic"
                }
                onChange={handleChange}
              />
              Arabic
            </label>
            <label>
              <input
                type="checkbox"
                name="language"
                value="Yoruba"
                checked={
                  Array.isArray(book.language)
                    ? book.language.includes("Yoruba")
                    : book.language === "Yoruba"
                }
                onChange={handleChange}
              />
              Yoruba
            </label>
            <label>
              <input
                type="checkbox"
                name="language"
                value="Hausa"
                checked={
                  Array.isArray(book.language)
                    ? book.language.includes("Hausa")
                    : book.language === "Hausa"
                }
                onChange={handleChange}
              />
              Hausa
            </label>
          </div>
        </fieldset>

        <label>Short Description</label>
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <label>Detailed Description</label>
        <textarea
          name="description"
          value={book.longDescription}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <div>
          <label>Cover Image:</label>
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt="Current cover"
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "20px",
              }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleCoverUpload} />
        </div>

        <div>
          <label>Book File (PDF):</label>
          {book.fileUrl && (
            <p>
              Current file:{" "}
              <a href={book.fileUrl} target="_blank" rel="noreferrer">
                View PDF
              </a>
            </p>
          )}
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
          />
        </div>

        {!isPending && <button type="submit">Save Changes</button>}
        {isPending && <button disabled>Saving...</button>}
      </form>
    </div>
  );
};

export default EditBook;
