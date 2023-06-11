export default function SearchBar({ searched, setSearched }) {
  return (
    <div className="navbar__searchbar">
      <input
        value={searched}
        onChange={(event) => setSearched(event.target.value)}
        type="text"
        placeholder="Search movies..."
      ></input>
    </div>
  );
}
