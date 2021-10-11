import { Movie } from "../Interfaces";

/**
 * It removes any duplicate film from the array of movies.
 * @param movieSet Is our array of movies.
 * @returns The movie array without duplicates.
 */
export const removeDuplicates = (movieSet: Movie[]) => {
  const uniqueArray = movieSet.filter((movie, index) => {
    const _movie = JSON.stringify(movie);
    return (
      index ===
      movieSet.findIndex((auxMovie) => {
        return JSON.stringify(auxMovie) === _movie;
      })
    );
  });
  return uniqueArray;
};
