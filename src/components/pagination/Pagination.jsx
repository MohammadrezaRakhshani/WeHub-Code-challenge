import React, { useState } from "react";
import "./Pagination.css";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.dataLength / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li className="pagination-item" key={number}>
      <button
        className={`pagination-button${
          currentPage === number ? "-active" : ""
        }`}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </button>
    </li>
  ));

  props.onPageChange(currentPage);

  return (
    <React.Fragment>
      <ul className="pagination">{renderPageNumbers}</ul>
    </React.Fragment>
  );
};

export default Pagination;
