import React from "react";

const SearchModal = ({ show, onClose }) => {
  return (
    <div className={`search-overlay ${show && "search-overlay-active"} `}>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="search-overlay-layer" />
          <div className="search-overlay-layer" />
          <div className="search-overlay-layer" />
          <div onClick={onClose} className="search-overlay-close">
            <span className="search-overlay-close-line" />
            <span className="search-overlay-close-line" />
          </div>
          <div className="search-overlay-form">
            <form>
              <input
                type="text"
                className="input-search"
                placeholder="Search here..."
                required
              />
              <button type="submit">
                <i className="fas fa-search" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
