import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import CheckboxDropdown from "./CheckboxDropdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BhavyaTable(props) {

  const data = props.data;
  const maxLengthObject = data.reduce((maxObj, currentObj) => {
    const maxObjLength = Object.keys(maxObj).length;
    const currentObjLength = Object.keys(currentObj).length;

    return currentObjLength > maxObjLength ? currentObj : maxObj;
  }, {});
  const allColumns = Object.keys(maxLengthObject).map((column) => ({
    name: column,
    visible: true,
  }));
  const [colData, setColData] = useState([]);
  const [columns, setColumns] = useState(allColumns);
  const [filteredData, setFilteredData] = useState(data);
  const [sortOrder, setSortOrder] = useState(-1);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");

  if (colData.length <= 0) {
    let tempColData = [];
    columns.forEach((column) => {
      tempColData.push({
        name: column.name,
        selected: true,
      });
    });
    setColData(tempColData);
  }

  const handleSort = (column) => {
    let sortedData = null;
    if (sortOrder === -1) {
      sortedData = [...filteredData].sort((a, b) => (a[column] > b[column] ? 1 : -1));
      if (sortedData[column] === filteredData[column]) {
        sortedData = sortedData.reverse();
        setSortOrder(1);
      } else {
        setSortOrder(0);
      }
    } else if (sortOrder === 0 || sortOrder === 1) {
      if (sortOrder === 0) {
        sortedData = [...filteredData].sort((a, b) => (a[column] < b[column] ? 1 : -1));
        setSortOrder(1);
      } else if (sortOrder === 1) {
        sortedData = [...filteredData].sort((a, b) => (a[column] > b[column] ? 1 : -1));
        setSortOrder(0);
      } else {
        sortedData = filteredData.reverse();
        setSortOrder(0);
      }
    }
    setFilteredData(sortedData);
  };

  const handleFilterToggle = (columnName, value) => {
    const columnFilters = selectedFilters[columnName] || [];
    const updatedFilters = columnFilters.includes(value)
      ? columnFilters.filter((val) => val !== value)
      : [...columnFilters, value];

    setSelectedFilters({
      ...selectedFilters,
      [columnName]: updatedFilters,
    });
  };

  const handleFilter = () => {
    const filteredData = data.filter((item) => {
      return Object.entries(selectedFilters).every(([column, filters]) => {
        return filters.length === 0 || filters.includes(item[column]);
      });
    });

    setFilteredData(filteredData);
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) => {
      return Object.entries(selectedFilters).every(([column, filters]) => {
        return filters.length === 0 || filters.includes(item[column]);
      });
    });

    const searchInput = document.getElementById("search-input");

    if (searchInput.value === "") {
      setFilteredData(filteredData);
    } else {
      const searchFilteredData = filteredData.filter((item) => {
        return columns
          .filter((column) => column.visible)
          .some((column) => {
            const columnValue = item[column.name];
            return (
              columnValue &&
              columnValue
                .toString()
                .toLowerCase()
                .includes(searchInput.value.toString().toLowerCase())
            );
          });
      });
      setFilteredData(searchFilteredData);
    }
  };

  const handleColumnToggle = (columnName) => {
    const updatedColumns = columns.map((column) =>
      column.name === columnName ? { ...column, visible: !column.visible } : column
    );
    setColumns(updatedColumns);
  };

  const handleExportCSV = () => {
    const selectedColumns = columns.filter((column) => column.visible);
    const csvData = filteredData.map((item) => {
      return selectedColumns.reduce((acc, col) => {
        acc[col.name] = item[col.name];
        return acc;
      }, {});
    });

    return csvData;
  };

  const handleExportPDF = () => {
    const selectedColumns = columns.filter((column) => column.visible);
    const doc = new jsPDF();
    const tableData = filteredData.map((item) =>
      selectedColumns.map((col) => String(item[col.name]))
    );
    doc.autoTable({
      head: [selectedColumns.map((col) => String(col.name))],
      body: tableData,
    });
    doc.save("table.pdf");
  };

  const handleDragStart = (e, columnName) => {
    e.dataTransfer.setData("text/plain", columnName);
  };

  const handleDrop = (e, targetColumnName) => {
    const sourceColumnName = e.dataTransfer.getData("text/plain");
    const updatedColumns = [...columns];

    const sourceColumnIndex = updatedColumns.findIndex(
      (column) => column.name === sourceColumnName
    );
    const targetColumnIndex = updatedColumns.findIndex(
      (column) => column.name === targetColumnName
    );

    const [sourceColumn] = updatedColumns.splice(sourceColumnIndex, 1);
    updatedColumns.splice(targetColumnIndex, 0, sourceColumn);

    setColumns(updatedColumns);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
      </Head>
      <div>
        <div className="container d-grid">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start my-3">
              <CheckboxDropdown
                colData={colData}
                handleColumnToggle={handleColumnToggle}></CheckboxDropdown>
            </div>
            <div className="my-3 d-table-cell justify-content-center">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  id="search-input"
                  type="text"
                  value={searchValue}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                    handleSearch();
                  }}
                  className="form-control"
                  placeholder="Search..."
                />
                {/* <button className="btn btn-secondary" type="button" id="button-addon2">
                Search
              </button> */}
              </div>
            </div>
            <div className="d-flex justify-content-end my-3">
              <button className="btn btn-danger mx-1" onClick={handleExportPDF}>
                Export PDF&nbsp;&nbsp;<i className="bi bi-file-earmark-pdf-fill"></i>
              </button>
              <button className="btn btn-success mx-1">
                <CSVLink
                  className="text-light text-decoration-none"
                  data={handleExportCSV()}
                  filename="table.csv">
                  Export CSV&nbsp;&nbsp;<i className="bi bi-filetype-csv"></i>
                </CSVLink>
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                {columns.map((column) =>
                  column.visible ? (
                    <th
                      key={column.name}
                      draggable
                      onDragStart={(e) => handleDragStart(e, column.name)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.name)}>
                      <div className="row d-flex justify-content-center mt-2">
                        <div className="col-12 text-end p-1 me-3">
                          <div className="float-start ms-3">
                            {column.name.charAt(0).toUpperCase() + column.name.slice(1)}
                          </div>
                          <button
                            className="btn btn-link text-info text-decoration-none p-1"
                            onClick={() => handleSort(column.name)}>
                            <i className="bi bi-arrow-down-up"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-link text-warning text-decoration-none p-1"
                            data-bs-toggle="modal"
                            data-bs-target={`#filterModal_${column.name}`}>
                            <i className="bi bi-funnel-fill"></i>
                          </button>
                        </div>
                      </div>
                      <div
                        className="modal fade"
                        id={`filterModal_${column.name}`}
                        tabIndex="-1"
                        aria-labelledby={`filterModalLabel_${column.name}`}
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title text-dark"
                                id={`filterModalLabel_${column.name}`}>
                                {column.name.charAt(0).toUpperCase() + column.name.slice(1)} Filters
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                            </div>
                            <div className="modal-body fw-normal">
                              {Array.from(new Set(data.map((item) => item[column.name]))).map(
                                (value) => (
                                  <div className="form-check my-4" key={value}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`filter_${column.name}_${value}`}
                                      value={value}
                                      checked={selectedFilters[column.name]?.includes(value) || false}
                                      onChange={() => handleFilterToggle(column.name, value)}
                                    />
                                    <label
                                      className="form-check-label text-dark"
                                      htmlFor={`filter_${column.name}_${value}`}>
                                      {value}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                data-bs-dismiss="modal"
                                className="btn btn-success"
                                onClick={handleFilter}>
                                Apply Filters
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal">
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  {columns.map((column) =>
                    column.visible ? <td key={column.name}>{item[column.name]}</td> : null
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
