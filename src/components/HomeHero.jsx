function HeroSearch() {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search?query=${term}`;
  };

  return (
    <form className="hero-search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search books..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
export default HeroSearch;
