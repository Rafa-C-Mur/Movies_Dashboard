import { useState } from "react";
import SearchBox from "./components/SearchBox";
import "../src/styles/App.css";
import MovieTable from "./components/MovieTable";
import { Movie } from "./Interfaces";
import FilterRatingInput from "./components/FilterRatingInput";
import FilterGenreInput from "./components/FilterGenreInput";

/**
 * This app is a table of movies, it contains information about movies that we can find in the
 * ODBm movies database. Each movie has a set of attributes.
 * IMPORTANT: We can change the attributes that appear if we go to data -> Data.tsx -> DESIRED_ATTRIBS
 * It also contains filters for filtering the movies by an attribute.
 *
 * @returns One seatch component for searching the movies, some filter components and also the table of movies.
 */
function App() {
  const [movieSet, setMovieSet] = useState<Movie[]>([]);
  const [filterVal, setFilterVal] = useState<number>(-1);
  const [genreToFilter, setGenreToFilter] = useState<string>("");

  return (
    <div className="App">
      <h1 className="App-header">Rafa's movies table</h1>

      <SearchBox setMovieSet={setMovieSet} />

      <FilterRatingInput setFilterVal={setFilterVal} />

      <FilterGenreInput setGenreToFilter={setGenreToFilter} />

      <MovieTable
        movieSet={movieSet}
        setMovieSet={setMovieSet}
        filterVal={filterVal / 100}
        genreToFilter={genreToFilter}
      />
    </div>
  );
}

export default App;
