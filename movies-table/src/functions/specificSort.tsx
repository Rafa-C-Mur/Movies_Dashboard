import { Movie, SortType } from "../Interfaces";
import * as Rate from "./Rate";

/**
 * Given a string like "abc 134", it obtains the number 134
 * @param str The string to be treated.
 * @returns The numbers inside an string.
 */
const getNumbersInString = (str: string): number => {
  let tmp = str.split("");

  let map = tmp.map((current) => {
    if (!isNaN(parseInt(current))) {
      return current;
    }
  });

  let numbers = map.filter(function (value) {
    return value !== undefined;
  });

  return parseInt(numbers.join(""));
};

export const sortByNumbersInString = (
  copy: Movie[],
  desiredAttrib: string,
  currentSortType: SortType
) => {
  return copy.sort((a: any, b: any) =>
    getNumbersInString(a[desiredAttrib]) > getNumbersInString(b[desiredAttrib])
      ? 1 * currentSortType.value
      : -1 * currentSortType.value
  );
};

export const sortByRatings = (
  copy: Movie[],
  desiredAttrib: string,
  currSort: SortType
) => {
  return copy.sort((a: any, b: any) => {
    return Rate.calculateRatingsMean(a[desiredAttrib]) >
      Rate.calculateRatingsMean(b[desiredAttrib])
      ? 1 * currSort.value
      : -1 * currSort.value;
  });
};

export const sortNormally = (
  copy: Movie[],
  desiredAttrib: string,
  currentSortType: SortType
) => {
  return copy.sort((a: any, b: any) =>
    a[desiredAttrib] > b[desiredAttrib]
      ? 1 * currentSortType.value
      : -1 * currentSortType.value
  );
};
