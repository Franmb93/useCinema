import { useState } from "react";
import "../../styles/Movies.css";
import Movie from "./Movie";
//   {
//   "imdbID": "tt1375666",
//   "Title": "Inception",
//   "Year": "2010",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
// },
export default function Movies({ fetchedMovies }) {
  return (
    <div className="movies">
      <ul className="movies__list">
        {fetchedMovies.map((movie) => (
          <Movie movie={movie}></Movie>
        ))}
      </ul>
    </div>
  );
}
