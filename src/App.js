import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/Main";
import Movies from "./components/movies/Movies";
import Movie from "./components/movies/Movie";
import Statistics from "./components/movies/Statistics";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const res = await fetch(`${process.env.PUBLIC_URL}/movies.json`);
    const data = await res.json();

    setMovies(data);
  };

  const getWachedMovies = async () => {
    const res = await fetch("./watched_movies.json");
    const data = await res.json();
    setWatchedMovies(data);
  };

  useEffect(() => {
    getMovies();
    getWachedMovies();
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <Navbar></Navbar>
      <Main movies={movies} watchedMovies={watchedMovies}>
        <Movies>
          <ul className="movies__list">
            {movies.map((movie) => (
              <Movie key={movie.imdbID} movie={movie}></Movie>
            ))}
          </ul>
        </Movies>
        <Movies>
          <ul className="movies__list">
            <Statistics watched={watchedMovies}></Statistics>
            {watchedMovies.map((movie) => (
              <Movie key={movie.imdbID} movie={movie}></Movie>
            ))}
          </ul>
        </Movies>
      </Main>
    </div>
  );
}

export default App;
