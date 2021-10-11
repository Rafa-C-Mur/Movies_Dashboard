import "../styles/FilterRatingInput.css";

interface Props {
  setFilterVal: Function;
}
//TODO too much re renders if I dont wait some time for the input

export default function FilterRatingInput(props: Props) {
  const handleChange = (event: any) => {
    event.preventDefault();
    props.setFilterVal(event.currentTarget.value);
  };

  return (
    <div className="filter-container">
      <h3 className="filter-text">Filter by rating </h3>
      <input
        id="filter"
        className="filter-input"
        type="range"
        placeholder="Filter by Rating"
        onChange={handleChange}
        defaultValue={0}
      />
    </div>
  );
}
