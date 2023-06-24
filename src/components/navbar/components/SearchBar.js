import { useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery }) {
  const searchRef = useRef();

  useEffect(
    function () {
      function focusOnEnterSearch(e) {
        if (document.activeElement === searchRef.current) return;

        if (e.key === "Enter") {
          searchRef.current.focus();
          setQuery("");
        }
      }

      searchRef.current.focus();

      document.addEventListener("keydown", focusOnEnterSearch);
      return () => document.removeEventListener("keydown", focusOnEnterSearch);
    },
    [setQuery]
  );

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
