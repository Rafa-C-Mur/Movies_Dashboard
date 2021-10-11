import { Movie } from "../Interfaces";
import * as Rate from "../functions/Rate";
import { useState } from "react";
import Modal from "./Modal";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { DESIRED_ATTRIBS, MAX_STARS } from "../data/Data";

interface Props {
  movieSet: Movie[];
}

export default function TableBody(props: Props) {
  const [movieToShow, setMovieToShow] = useState<Movie | null>(null);
  const [activeRow, setActiveRow] = useState<string>();

  const findMovieByTitle = (title: string) => {
    let ret = null;
    props.movieSet.map((myMovie: Movie) => {
      if (myMovie.Title === title) {
        ret = myMovie;
      }
    });
    return ret;
  };

  const onClose = () => {
    setMovieToShow(null);
  };

  const handleClick = (myMovieTitle: string) => (ev: any) => {
    ev.preventDefault();
    setActiveRow(myMovieTitle);
    setMovieToShow(
      findMovieByTitle(ev.currentTarget.firstChild.firstChild.data)
    );
  };

  /**
   * It finds if a given attribute of a film, such as the rating
   * @param keyValue Is an attribute of a film.
   * @returns
   */
  const isAttribInDesiredSet = (keyValue: any[]) => {
    let flag = false;
    if (DESIRED_ATTRIBS.includes(keyValue[0])) {
      flag = true;
    }
    return flag;
  };

  const renderStars = (numStars: any) => {
    let stars = [];
    for (let i = 0; i < MAX_STARS; i++) {
      if (i < numStars) {
        stars.push(<AiFillStar />);
      } else {
        stars.push(<AiOutlineStar />);
      }
    }
    return stars;
  };

  const calcNumStars = (value: number) => {
    return Math.round(value * MAX_STARS);
  };

  const renderOneAttribute = (keyValue: any) => {
    let attrib;
    if (keyValue[0] === "Ratings") {
      const numStars = calcNumStars(Rate.calculateRatingsMean(keyValue[1]));
      attrib = <div>{renderStars(numStars)}</div>;
    } else {
      attrib = keyValue[1];
    }
    return <td>{attrib}</td>;
  };

  /**
   * Given one movie, it returns that movie in the form of a html row (<tr></tr>).
   * @param myMovie
   * @returns the movie to jsx format
   */
  const renderOneMovie = (myMovie: Movie) => {
    if (myMovie === undefined || myMovie.Response === "False") {
      return; //Do nothing
    }
    const entries = Object.entries(myMovie); //Returns a vector like this [[key, value][key, value]]

    const movieToHTML = entries.map((keyValueElem: string[]) => {
      if (isAttribInDesiredSet(keyValueElem)) {
        return renderOneAttribute(keyValueElem);
      }
    });

    return (
      <tr
        key={myMovie.Title}
        className={activeRow === myMovie.Title ? "active-row" : "inactive-row"}
        onClick={handleClick(myMovie.Title)}
      >
        {movieToHTML}
      </tr>
    );
  };

  const renderArrayOfMovies = () => {
    if (props.movieSet === undefined || props.movieSet === []) {
      return;
    } else {
      //This returns a <tr></tr> list. Each TR is a movie
      const procesedMovies = props.movieSet.map((myMovie: Movie) => {
        return renderOneMovie(myMovie);
      });
      return procesedMovies;
    }
  };

  return (
    <tbody>
      {renderArrayOfMovies()}
      <Modal onClose={onClose} movieToShow={movieToShow} />
    </tbody>
  );
}
