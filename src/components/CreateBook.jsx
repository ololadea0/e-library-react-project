import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UploadPdf, uploadImageTwo } from "../utiltities/Uploader";
import Message from "./Message";
import useMessage from "./UseMessage";
import { createClient } from "@supabase/supabase-js";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [longdescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("Tafsir");
  const [language, setLanguage] = useState(["English"]);
  const [coverImageFile, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const SUPABASE_URL = window.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = window.env.SUPABASE_ANON_KEY;

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { message, type, showMessage } = useMessage();

  const coverPreview = coverImageFile
    ? URL.createObjectURL(coverImageFile)
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      let imageUrl = "";
      if (coverImageFile) {
        imageUrl = await uploadImageTwo(coverImageFile);
        if (!imageUrl) throw new Error("Image upload failed");
      }

      let pdfUrl = "";
      if (bookFile) {
        pdfUrl = await UploadPdf(bookFile);
        if (!pdfUrl) throw new Error("PDF upload failed");
      }

      const newBook = {
        id: String(Date.now()),
        title,
        author,
        description,
        longdescription,
        category,
        language,
        coverimage: imageUrl,
        fileurl: pdfUrl,
      };

      const { data, error: insertError } = await supabase
        .from("books")
        .insert([newBook]);

      if (insertError) throw insertError;
    } catch (err) {
      setIsPending(false);
      setError(err.message || "Upload failed");
      showMessage("Failed to add book", "error");
      console.error("Error uploading book:", err);
    } finally {
      setIsPending(false);
      // navigate("/admin");
      showMessage("Book added successfully", "success");
      setTitle("");
      setAuthor("");
      setDescription("");
      setLongDescription("");
      setCategory("Tafsir");
      setLanguage(["English"]);
      setCoverImage(null);
      setBookFile(null);
    }
  };

  return (
    <div className="create-book">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <label>Book title</label>
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Author</label>
        <input
          type="text"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                value="English"
                checked={language.includes("English")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "English"]);
                  } else {
                    setLanguage(language.filter((lang) => lang !== "English"));
                  }
                }}
              />
              English
            </label>
            <label>
              <input
                type="checkbox"
                value="Arabic"
                checked={language.includes("Arabic")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "Arabic"]);
                  } else {
                    setLanguage(language.filter((lang) => lang !== "Arabic"));
                  }
                }}
              />
              Arabic
            </label>
            <label>
              <input
                type="checkbox"
                value="Yoruba"
                checked={language.includes("Yoruba")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "Yoruba"]);
                  } else {
                    setLanguage(language.filter((lang) => lang !== "Yoruba"));
                  }
                }}
              />
              Yoruba
            </label>
            <label>
              <input
                type="checkbox"
                value="Hausa"
                checked={language.includes("Hausa")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "Hausa"]);
                  } else {
                    setLanguage(language.filter((lang) => lang !== "Hausa"));
                  }
                }}
              />
              Hausa
            </label>
          </div>
        </fieldset>

        <label>Short Description</label>
        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Detailed Description</label>
        <textarea
          value={longdescription}
          required
          onChange={(e) => setLongDescription(e.target.value)}
        ></textarea>

        <label>Cover Image (jpg / png)</label>
        {coverPreview && (
          <img
            src={coverPreview}
            alt="Current cover"
            style={{
              width: "120px",
              height: "auto",
              marginBottom: "20px",
            }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
        <label>Book File (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setBookFile(e.target.files[0])}
        />
        <button type="submit">Upload Book</button>
        {isPending && <div className="loading">Uploading book...</div>}
        {error && <div className="error">Error: {error}</div>}
      </form>
      <div>
        <Message message={message} type={type} />
      </div>
    </div>
  );
};

export default CreateBook;
