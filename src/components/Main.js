import Movies from "./movies/Movies";

export default function Main({ movies, watchedMovies }) {
  console.log(movies);
  return (
    <div className="main">
      <Movies className="box" fetchedMovies={movies}></Movies>
      <Movies className="box" fetchedMovies={movies}></Movies>
    </div>
  );
}
