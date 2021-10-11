import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { DESIRED_ATTRIBS } from "../data/Data";
import * as Sort from "../functions/Sort";
import { Movie, SortType } from "../Interfaces";
import "../styles/TableHeader.css";

interface Props {
  setMovieSet: Function;
  movieSet: Movie[];
}

/**
 * It builds the heading of the table using the attributtes of the movie that
 * the desiredAttribs vector say
 * @returns The jsx code with the heading of the table
 */
export default function TableHeader(props: Props) {
  const [sortDirection, setSortDirection] = useState<SortType>(
    Sort.sortTypes.dsc
  );

  const [sortAttrib, setSortAttrib] = useState<string>("");

  const handleClick = (desiredAttrib: string) => {
    props.setMovieSet((prevSet: Movie[]) =>
      Sort.handleSort(
        prevSet,
        desiredAttrib,
        Sort.toggleSortType(sortDirection)
      )
    );
    setSortDirection((prev) => Sort.toggleSortType(prev));
    setSortAttrib(desiredAttrib);
  };

  const createHeaderRow = () => {
    return DESIRED_ATTRIBS.map((desiredAttrib) => (
      <th key={desiredAttrib}>
        <div
          className="header-container"
          onClick={() => handleClick(desiredAttrib)}
        >
          {desiredAttrib}

          <span className="arrow-icon">
            {desiredAttrib === sortAttrib ? (
              sortDirection === Sort.sortTypes.asc ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )
            ) : null}
          </span>
        </div>
      </th>
    ));
  };

  return (
    <thead>
      <tr className="header-row">{createHeaderRow()}</tr>
    </thead>
  );
}
