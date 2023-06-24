import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onDeleteWatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imbdId}
          onDeleteWatch={onDeleteWatch}
        />
      ))}
    </ul>
  );
}
