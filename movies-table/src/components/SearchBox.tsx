import { getMovieSet } from "../functions/Search";
import { BiSearchAlt } from "react-icons/bi";
import "../styles/SearchBox.css";
import { removeDuplicates } from "../functions/RemoveDuplicates";

interface Props {
  setMovieSet: Function;
}

function SearchBox(props: Props) {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const searchValue = event.currentTarget.elements.movieInput.value;
    let movies: any = await getMovieSet(searchValue);
    //We see if there are any duplicates before keeping our films
    movies = removeDuplicates(movies);
    //We update the real movieSet
    props.setMovieSet(movies); //TODO, Is it a good idea to update the state of a Parent inside a Child?
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id="movieInput"
          className="search-input"
          type="text"
          placeholder="Press Enter"
        />
        <button type="submit" className="search-button">
          <BiSearchAlt />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
