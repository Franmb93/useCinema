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
import SelectedMovie from "./components/movies/SelectedMovie";
import { getMoviesURL } from "./constants";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("shrek");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    function scapeListener(e) {
      if (e.key === "Escape") {
        handleCloseMovie();
      }
    }

    document.addEventListener("keydown", scapeListener);

    return () => {
      document.removeEventListener("keydown", scapeListener);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        await fetch(getMoviesURL(searchQuery), { signal: controller.signal })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Something went wrong while fetching movies.");
            }
          })
          .then((data) => {
            console.log(data);
            if (data.Response === "False") throw new Error(data.Error);
            setMovies(data.Search);
            setError("");
          });
      } catch (error) {
        console.error(error);
        if (error.name !== "AbortError") {
          setError(error.message);
        }
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

    return function () {
      controller.abort();
    };
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
          {!isLoading && !error && (
            <Movies movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
              key={selectedId}
            ></SelectedMovie>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatch={handleDeleteWatch}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
