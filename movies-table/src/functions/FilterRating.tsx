import { Movie, Rating } from "../Interfaces";
import { calculateRatingsMean } from "./Rate";

/**
 * It takes a Rating object , it calculates the bean between all
 * of the ratings and it compares it with minValue. If it is above minValue, the mean is returned,
 * otherwise, -1 is returned.
 *
 * @param ratings It's an object of type rating, which contains various ratings inside
 * @param minValue It's the minimum value to filter the ratings
 * @returns
 */
const isBelowMinRating = (ratings: Rating[], minValue: number) => {
  const calculatedRating = calculateRatingsMean(ratings);
  return calculatedRating > minValue ? calculatedRating : -1;
};

/**
 * Given a movie, if its rating is below minValue, it will be filtered.
 *
 * @param myMovie It's the movie to be filtered or not
 * @param minValue It's the minimum value to filter the movies. Every movie whose rating is below
 * the minimum will be filtered.
 * @returns
 */
const filterMovieByRating = (myMovie: Movie, minValue: number) => {
  const entries = Object.entries(myMovie); //Returns a vector like this [[key, value][key, value]]
  let ratings: Rating[] = [];
  entries.map((keyValue) => {
    if (keyValue[0] === "Ratings") {
      ratings = keyValue[1];
    }
  });
  return isBelowMinRating(ratings, minValue);
};

/**
 * Given a set of movies, it filters all the movies whose rating is below minValue
 * @param myMovies It's the array of movies to filter
 * @param minValue It's the minimum value to filter the movies. Every movie whose rating is below
 * the minimum will be filtered.
 * @returns
 */
export const filterMoviesByRating = (
  myMovies: Movie[],
  minValue: number
): Movie[] => {
  if (myMovies === undefined) return [];

  const filtered: Movie[] = myMovies.filter(
    (movie) => filterMovieByRating(movie, minValue) !== -1
  );

  return filtered;
};
