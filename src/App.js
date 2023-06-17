import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import NumResults from "./components/navbar/components/NumResults";
import SearchBar from "./components/navbar/components/SearchBar";
import Main from "./components/Main";
import Box from "./components/Box";
import Movies from "./components/movies/Movies";
import WatchedMoviesList from "./components/movies/WatchedMoviesList";
import WatchedSummary from "./components/movies/WatchedSummary";
import Loader from "./components/Loader";
import ErrorCustom from "./components/Error";
function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        await fetch(
          `https://www.omdbapi.com/?apikey=${
            process.env.REACT_APP_OMBD_KEY
          }&s=${searchQuery.replace(" ", "+")}}`
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Something went wrong while fetching movies.");
            }
          })
          .then((data) => {
            if (data.Response === "False") throw new Error(data.Error);
            setMovies(data.Search);
          });
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.length < 3) {
      setIsLoading(false);
      setError("");
      return;
    }

    fetchMovies();
  }, [searchQuery]);

  return (
    <>
      <Navbar>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorCustom error={error} />}
          {!isLoading && !error && <Movies movies={movies} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

export default App;

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
