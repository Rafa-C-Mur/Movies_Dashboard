import { GENRES_TO_SELECT } from "../data/Data";
import "../styles/FilterGenreInput.css";

interface Props {
  setGenreToFilter: Function;
}

/**
 * It is a select field that filters our movies by gender. You can change the genders that appear
 * in the select going to data > Data.tsx > GENRES_TO_SELECT
 */
export default function FilterGenreInput(props: Props) {
  const handleChange = (event: any) => {
    event.preventDefault();
    props.setGenreToFilter(event.currentTarget.value);
  };

  const displayOptions = () => {
    return GENRES_TO_SELECT.map((genre) => (
      <option key={genre}>{genre}</option>
    ));
  };

  return (
    <div className="filter-container">
      <h3 className="filter-text">Filter by Genre </h3>
      <select className="select" onChange={handleChange}>
        <option key="Everything">
          {"<"} Everything {">"}
        </option>
        {displayOptions()}
      </select>
    </div>
  );
}
