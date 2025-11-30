import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./css/fonts.css";
import "./css/style.css";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Nav";
import Home from "./pages/Home";
import Library from "./pages/Library";
import BookDetails from "./pages/BookDetails";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      {/* Simple Navbar */}
      <Navbar />

      {/* Routes */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/category/:name" element={<CategoryPage />} />
        <Route path="/library/books/:id" element={<BookDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/createbook" element={<CreateBook />} />
        <Route path="/admin/edit" element={<Edit />} />
        <Route path="/admin/edit/:id" element={<EditBook />} />
        <Route path="/admin/deletebook" element={<DeleteBook />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
