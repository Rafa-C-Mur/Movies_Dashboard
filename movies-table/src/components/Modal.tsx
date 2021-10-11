import ReactDOM from "react-dom";
import { Movie } from "../Interfaces";
import "../styles/Modal.css";

interface Props {
  onClose: any;
  movieToShow: Movie | null;
}

const MODAL_STYLES: any = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFFFFF",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES: any = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal(props: Props) {
  const buildMovieInsideModal = () => {
    if (props.movieToShow === null) {
      return;
    }
    return (
      <div className="container">
        <h1 className="movie-title">{props.movieToShow.Title}</h1>
        <img src={props.movieToShow.Poster} alt="Movie poster" />
        <h3 className="movie-year">{props.movieToShow.Released}</h3>
        <p>Actors: {props.movieToShow.Actors}</p>
        <p>{props.movieToShow.Plot}</p>
      </div>
    );
  };

  const component: any = (
    <div style={OVERLAY_STYLES}>
      <div style={MODAL_STYLES}>
        {buildMovieInsideModal()}
        <button onClick={props.onClose}>Exit</button>
      </div>
    </div>
  );

  const portal: any = document.getElementById("portal");

  if (props.movieToShow === null) {
    return null;
  } else {
    return ReactDOM.createPortal(component, portal);
  }
}
