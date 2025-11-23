import "../css/fonts.css";
import {
  FaBookOpen,
  FaScroll,
  FaBalanceScale,
  FaStarAndCrescent,
  FaPrayingHands,
  FaHistory,
} from "react-icons/fa";
import "../css/categories.css";
import { Link } from "react-router-dom";

const categories = [
  { name: "Tafsir", icon: <FaBookOpen size={36} color="#007f3d" /> },
  { name: "Hadith", icon: <FaScroll size={36} color="#007f3d" /> },
  { name: "Fiqh", icon: <FaBalanceScale size={36} color="#007f3d" /> },
  { name: "Aqeedah", icon: <FaStarAndCrescent size={36} color="#007f3d" /> },
  { name: "Adhkaar", icon: <FaPrayingHands size={36} color="#007f3d" /> },
  { name: "History", icon: <FaHistory size={36} color="#007f3d" /> },
];

export default function Categories({ title }) {
  return (
    <section className="categories-section fade-item">
      <h2>{title}</h2>
      <div className="categories-grid">
        {categories.map((c) => (
          <div className="category-card fade-item " key={c.name}>
            <Link
              to={`/library/category/${c.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={c.name}
              relative="path"
            >
              <div className="icon">{c.icon}</div>
              <p>{c.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
