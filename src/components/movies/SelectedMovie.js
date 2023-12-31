import { useCallback, useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "../Loader";
import { getSelectedMovieURL } from "../../constants";
export { getSelectedMovieURL } from "../../constants";

export default function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [alreadyWatched, setAlreadyWatched] = useState(false);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Year: year,
  } = movie;

  const checkIfWatched = useCallback(() => {
    const checkAlreadyWatched = watched.find(
      (movie) => movie.imbdRating === selectedId
    );

    if (checkAlreadyWatched) {
      setAlreadyWatched(true);
      setUserRating(checkAlreadyWatched.userRating);
    }
  }, [watched, selectedId]);

  function handleAddWatched() {
    if (checkIfWatched()) {
      return;
    }

    const newWatchedMovie = {
      imbdId: selectedId,
      imbdRating: imdbRating,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.replace("min", "")),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "useCinema";
      };
    },
    [title]
  );

  useEffect(() => {
    setIsLoading(true);
    async function getMovieDetails() {
      const response = await fetch(getSelectedMovieURL(selectedId));
      const data = await response.json();

      checkIfWatched();
      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId, checkIfWatched]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {alreadyWatched ? (
                <p>You rated this movie with {userRating} ⭐️</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    rating={userRating}
                    onSetRating={setUserRating}
                  ></StarRating>
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
