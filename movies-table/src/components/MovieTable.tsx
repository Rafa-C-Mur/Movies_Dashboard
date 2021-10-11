import { Movie } from "../Interfaces";
import * as FilterRating from "../functions/FilterRating";
import * as FilterGenre from "../functions/FilterGenre";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "../styles/MovieTable.css";
import { removeDuplicates } from "../functions/RemoveDuplicates";

interface Props {
  movieSet: Movie[];
  setMovieSet: Function;
  filterVal: number;
  genreToFilter: string;
}

function MovieTable(props: Props) {
  const doFilteringStuff = () => {
    removeDuplicates(props.movieSet);
    const filtered1 = FilterGenre.filterMoviesByGenre(
      props.movieSet,
      props.genreToFilter
    );

    const filtered2 = FilterRating.filterMoviesByRating(
      filtered1,
      props.filterVal
    );

    return filtered2;
  };

  return (
    <table className="movie-table">
      <TableHeader setMovieSet={props.setMovieSet} movieSet={props.movieSet} />

      <TableBody movieSet={doFilteringStuff()} />
    </table>
  );
}

export default MovieTable;
