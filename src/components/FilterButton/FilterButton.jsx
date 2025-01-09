import "./FilterButton.css";

const FilterButton = ({selectedFilters, setSelectedFilters , degree , applyNodeDegree}) => {
  const filterOptions = [
    "DISJOINT",
    "DATATYPE",
    "EXTERNAL",
    "OBJECT",
    "SUBCLASS",
    "SET_OPERATOR",
    "COMPACT_NOTATION",
    "EMPTY_LITERAL",
    "STATISTICS",
    "NODE_DEGREE",
  ];


  const handleCheckboxChange = (option) => {
    setSelectedFilters((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <div className="filter-cont">
      <div className="filter-btn">Filter List</div>
      <div className="filter-options">
        {filterOptions.map((option) => (
          <div key={option} className="filter-option">
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedFilters?.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </div>
        ))}

         <input
          type="range"
          max={degree.maxDegree}
          onChange={(e) => applyNodeDegree(parseInt(e.target.value, 10))}
          value={degree.currentDegree}
        />
      </div>
    </div>
  );
};

export default FilterButton;