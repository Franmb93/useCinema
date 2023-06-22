export const getMoviesURL = (searchQuery) => {
  let MOVIES_URL;
  console.log(process.env.REACT_APP_NODE_ENV);
  if (process.env.REACT_APP_NODE_ENV === "production") {
    MOVIES_URL = `https://www.omdbapi.com/?apikey=${
      process.env.REACT_APP_OMBD_KEY
    }&s=${searchQuery.replace(" ", "+")}`;
  } else {
    MOVIES_URL = `http://localhost:3001/movies`;
  }
  return MOVIES_URL;
};

export const getSelectedMovieURL = (selectedId) => {
  let SELECTED_MOVIE_URL;

  if (process.env.REACT_APP_NODE_ENV === "production") {
    SELECTED_MOVIE_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMBD_KEY}&i=${selectedId}`;
  } else {
    SELECTED_MOVIE_URL = `http://localhost:3001/movie`;
  }

  return SELECTED_MOVIE_URL;
};
