/**
 * Given a Title (e.g. "Batman v Superman"), it finds the movie related with that title.
 * Because we are finding by title, we are only going to return only one movie but we are going to
 * do it with all the information about that movie.
 * @param searchVal
 * @param type
 * @returns
 */
const searchMovieByTitle = async (searchVal: string, type: string) => {
  if (searchVal === "") {
    return null;
  }

  const url = `http://www.omdbapi.com/?t=${searchVal}&type=${type}&apikey=4dc30484`;
  //This is for getting the Movie from the API
  fetch(url);
  const response = await fetch(url);
  //We convert our movies to JSON format
  const responseJson = await response.json();
  if (responseJson.Response === "True") {
    return responseJson;
  }
};

/**
 * This is a promise method which obtains a set of Movies from OMDb films API, finding them by
 * search (?s).
 * depending on searchVal.
 * @param searchVal
 */
const searchMovies = async (searchVal: string, type: string) => {
  if (searchVal === "") {
    return;
  }
  const url = `http://www.omdbapi.com/?s=${searchVal}&type=${type}&apikey=4dc30484`;
  //This is for getting the Movies from the API
  const response = await fetch(url);
  //We convert our movies to JSON format
  const responseJson = await response.json();

  if (responseJson.Search !== undefined) {
    return responseJson.Search;
  }
};

/**
 * Given a search value (ejm: "batman") for finding movies in the OMBd API, it returns at most 10 movies
 * that fit with that search value. The movies are returned with all the possible information,
 * because first, we find them by search and then by title.
 * @param searchVal
 * @returns
 */
export const getMovieSet = async (searchVal: string) => {
  const type = "movie";
  let searchResult = await searchMovies(searchVal, type);

  if (searchResult !== undefined) {
    /* We create a and we throw each searchResult in the list but converted
     * to a search by title. And I have used await because this method returns
     * a promise.
     */
    let auxList = [];
    for (let i = 0; i < searchResult.length; i++) {
      auxList.push(await searchMovieByTitle(searchResult[i].Title, type));
    }
    return auxList;
  }
};
