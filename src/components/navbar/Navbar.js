import { useState } from "react";
import LogoNavbar from "./components/LogoNavbar";
import SearchBar from "./components/SearchBar";
import "../../styles/Navbar.css";

export default function Navbar() {
  const [searched, setSearched] = useState("");

  return (
    <nav className="navbar">
      <LogoNavbar src="./logo.png">useCinema</LogoNavbar>
      <SearchBar searched={searched} setSearched={setSearched}></SearchBar>
      <div className="navbar__results">5 movies found!</div>
    </nav>
  );
}
