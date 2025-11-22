import { HashRouter, Route, Routes } from "react-router-dom";
import "./css/fonts.css";
import "./css/style.css";
import { useEffect } from "react";
import Home from "./components/Home";
import Library from "./components/Library";
import BookDetails from "./components/BookDetails";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Nav";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./components/Categories";
import CategoryPage from "./components/CategoryPage";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
import DeleteBook from "./components/DeleteBook";
import Edit from "./components/Edit";

function App() {
  useEffect(() => {
    const selector = "section, .book, .category-card, .featured-books > *";
    const elements = Array.from(document.querySelectorAll(selector));
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => {
      // mark initial state (safe if class already exists)
      el.classList.add("reveal-init");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <div>
      {/* Simple Navbar */}
      <Navbar />

      {/* Routes */}
      <HashRouter>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/createbook" element={<CreateBook />} />
        <Route path="/admin/edit" element={<Edit />} />
        <Route path="/admin/edit/:id" element={<EditBook />} />
        <Route path="/admin/deletebook" element={<DeleteBook />} />
        <Route path="/library/category/:name" element={<CategoryPage />} />
      </HashRouter>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
