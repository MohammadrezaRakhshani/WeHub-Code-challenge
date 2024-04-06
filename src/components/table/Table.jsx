import React, { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Pagination from "../pagination/Pagination";
import "./Table.css";

const Table = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: "first_name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const sortData = () => {
      const sorted = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setSortedData(sorted);
    };

    if (sortConfig.key !== null) {
      sortData();
    }
  }, [data, sortConfig]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  if (currentItems.length === 0) {
    return <div style={{ color: "#4F45E4" }}>User not found</div>;
  }

  const renderTableData = currentItems.map((row, index) => (
    <tr key={index}>
      <td className="table-data-cell">{row.first_name}</td>
      <td className="table-data-cell">{row.last_name}</td>
      <td className="table-data-cell">{row.email}</td>
    </tr>
  ));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th
              className="table-header-cell"
              onClick={() => handleSort("first_name")}
            >
              <div className="header-context">
                Name
                {sortConfig.direction === "ascending" &&
                  sortConfig.key === "first_name" && (
                    <ArrowDropDownIcon fontSize="small" />
                  )}
                {sortConfig.direction === "descending" &&
                  sortConfig.key === "first_name" && (
                    <ArrowDropUpIcon fontSize="small" />
                  )}
              </div>
            </th>
            <th
              className="table-header-cell"
              onClick={() => handleSort("last_name")}
            >
              <div className="header-context">
                Lastname
                {sortConfig.direction === "ascending" &&
                  sortConfig.key === "last_name" && (
                    <ArrowDropDownIcon fontSize="small" />
                  )}
                {sortConfig.direction === "descending" &&
                  sortConfig.key === "last_name" && (
                    <ArrowDropUpIcon fontSize="small" />
                  )}
              </div>
            </th>
            <th
              className="table-header-cell"
              onClick={() => handleSort("email")}
            >
              <div className="header-context">
                Email
                {sortConfig.direction === "ascending" &&
                  sortConfig.key === "email" && (
                    <ArrowDropDownIcon fontSize="small" />
                  )}
                {sortConfig.direction === "descending" &&
                  sortConfig.key === "email" && (
                    <ArrowDropUpIcon fontSize="small" />
                  )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{renderTableData}</tbody>
      </table>
      <Pagination
        dataLength={sortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
