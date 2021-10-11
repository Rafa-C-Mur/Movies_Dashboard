import { Rating } from "../Interfaces";

/**
 * Given a rating, It returns the normalized value (in statistics, 0 to 1) of the given rating
 * @param ratingValue It is the rating to normalize
 * @returns It returns the normalized value (in statistics, 0 to 1) of the given rating
 */
const generalizeRatingFormat = (ratingValue: string): number => {
  let generalizedNumber = 0;
  //TODO It would be a would idea to standarize the numbers here (like we do in statistics with the std deviation)
  if (ratingValue.endsWith("/10")) {
    generalizedNumber =
      parseInt(ratingValue.slice(0, ratingValue.indexOf("/"))) / 10;
  } else if (ratingValue.endsWith("%")) {
    generalizedNumber =
      parseInt(ratingValue.slice(0, ratingValue.indexOf("%"))) / 100;
  } else if (ratingValue.endsWith("/100")) {
    generalizedNumber =
      parseInt(ratingValue.slice(0, ratingValue.indexOf("/"))) / 100;
  } else {
    console.error(
      "ERROR in MovieTable.tsx, in method generalizeRatingFormat(): The ratingValue attribute is not apropriate"
    );
  }
  return generalizedNumber;
};

/**
 * Given an array of ratings, it calculates its mean rounded to 2 decimals
 * @param ratings
 * @returns
 */
export const calculateRatingsMean = (ratings: Rating[]): number => {
  let sum: number = 0;
  const numElem: number = ratings.length;
  ratings.map(
    (rating: Rating) => (sum += generalizeRatingFormat(rating.Value))
  );

  return parseFloat((sum / numElem).toFixed(2)); //toFixed rounds the number to n decimals.
};
