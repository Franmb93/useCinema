import { useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery }) {
  const searchRef = useRef();

  useEffect(function () {
    searchRef.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchRef}
    />
  );
}
