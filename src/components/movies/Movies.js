import "./Movies.css";
import { useState } from "react";

export default function Movies({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="movies">
        <div className="open__controller" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "-" : "+"}
        </div>
        {isOpen && children}
      </div>
    </>
  );
}
