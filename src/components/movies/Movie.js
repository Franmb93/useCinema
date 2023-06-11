export default function Movie({ movie }) {
  return (
    <li className="movies__item" key={movie.imdbID}>
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movies__item__info">
        <h3>{movie.Title}</h3>
        <p>
          <span>📅</span>
          <span className="movies__item__info--year">{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
