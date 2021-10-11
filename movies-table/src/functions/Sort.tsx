import { Movie } from "../Interfaces";
import { SortType } from "../Interfaces";
import { SortTypes } from "../Interfaces";
import {
  sortByNumbersInString,
  sortByRatings,
  sortNormally,
} from "./specificSort";

/*
This constant contains the forms in which you can sort, for example, in ascendant order (asc).
 */
export const sortTypes: SortTypes = {
  asc: {
    class: "sort-asc",
    value: 1,
  },
  dsc: {
    class: "sort-dsc",
    value: -1,
  },
};

/**
 * It toggles between ascendent and descendent sort
 * @param sortType It can be asc or dsc
 * @returns If the sortype was asc, it returns dsc. Returns asc otherwise
 */
export const toggleSortType = (sortType: SortType) => {
  if (sortType.class === "sort-asc") sortType = sortTypes.dsc;
  else if (sortType.class === "sort-dsc") sortType = sortTypes.asc;
  return sortType;
};

/**
 * It sorts a set of movies depending on the attribute given (e.g. Year). The sort can be ascendent or descendent
 * depending on the value of currentSortType
 * @param movieSet The movies to sort
 * @param desiredAttrib Attribute to sort the movies with
 * @param currentSortType It can be ascendent or descendent
 * @returns The set of movies sorted.
 */
export const handleSort = (
  movieSet: Movie[],
  desiredAttrib: string,
  currentSortType: SortType
) => {
  if (movieSet === undefined || movieSet.length === 0) {
    return;
  }

  const copy = [...movieSet];

  let sorted: Movie[] = [];

  if (desiredAttrib === "Ratings") {
    sorted = sortByRatings(copy, desiredAttrib, currentSortType);
  } else if (desiredAttrib === "Runtime") {
    sorted = sortByNumbersInString(copy, desiredAttrib, currentSortType);
    console.log(sorted.map((mv) => mv.Runtime));
  } else {
    sorted = sortNormally(copy, desiredAttrib, currentSortType);
  }

  return sorted;
};
