import { GENRES_TO_SELECT } from "../data/Data";
import { Movie } from "../Interfaces";

const filterMovieByGenre = (myMovie: Movie, genre: string) => {
  let flag = false;
  if (myMovie.Genre.includes(genre)) {
    flag = true;
  }
  return flag;
};

export const filterMoviesByGenre = (myMovies: Movie[], genre: string) => {
  if (myMovies === undefined) return [];

  if (!GENRES_TO_SELECT.includes(genre)) return myMovies;

  const filtered: Movie[] = myMovies.filter(
    (movie) => filterMovieByGenre(movie, genre) === true
  );
  return filtered;
};
