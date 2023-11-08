import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {CustomMDBCol} from "./SearchBar.styles"

const SearchBar = ({ onSearch, searchText }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <CustomMDBCol md="6" className="mt-2">
      <form className="form-inline mt-0 mb-0">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Course Name or Code"
            aria-label="Search"
            onChange={handleSearch}
            value={searchText}
          />
        </div>
      </form>
    </CustomMDBCol>
  );
};

export default SearchBar;
