import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UploadPdf, uploadImageTwo } from "../hooks/Uploader";
import { supabase } from "../hooks/supabaseClient";
import Message from "../components/Message";
import useMessage from "../hooks/UseMessage";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [coverimage, setCoverImage] = useState("");
  const [fileurl, setFileUrl] = useState("");
  const { message, type, showMessage } = useMessage();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("books")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;

        setBook(data);
        setCoverImage(data.coverimage || "");
        setFileUrl(data.fileurl || "");
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
        showMessage("Failed to load book data", "error");
      }
    };

    fetchBook();
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
      setBook((prev) => ({ ...prev, fileurl: uploadedUrl }));
    }
    setIsPending(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const languageArray = `{${book.language.join(",")}}`;

      const { error: updateError } = await supabase
        .from("books")
        .update({ ...book, language: languageArray })
        .eq("id", id);

      if (updateError) throw updateError;

      setIsPending(false);
      showMessage("Book updated successfully", "success");
      navigate("/admin");
    } catch (err) {
      console.error("Error updating book:", err);
      showMessage("Failed to update book", "error");
      setIsPending(false);
    }
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
          value={book.longdescription}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <div>
          <label>Cover Image:</label>
          {book.coverImage && (
            <img
              src={book.coverimage}
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
          {book.fileurl && (
            <p>
              Current file:{" "}
              <a href={book.fileurl} target="_blank" rel="noreferrer">
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
      <div>
        <Message message={message} type={type} />
      </div>
    </div>
  );
};

export default EditBook;
