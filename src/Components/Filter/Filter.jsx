import React, { useState } from "react";
import "./Filter.css";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const Filter = ({ isActive, toggleFilter, setFilters, setFilterMessage }) => {
  const [filters, setLocalFilters] = useState({
    type: [],
    status: [],
    startDate: "",
    endDate: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const transactionTypes = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
  ];

  const transactionStatus = ["successful", "pending", "failed"]; // Ensure status matches API

  const handleApplyFilters = () => {
    setFilters({
      type: [
        ...transactionTypes.filter(
          (type) => document.getElementById(type)?.checked
        ),
      ],
      status: [
        ...transactionStatus.filter(
          (status) => document.getElementById(status)?.checked
        ),
      ],
      startDate: document.getElementById("start-date")?.value || "",
      endDate: document.getElementById("end-date")?.value || "",
    });

    toggleFilter(); // Close the filter drawer after applying
  };

  const handleClearFilters = () => {
    // Clear all the filters
    setLocalFilters({
      type: [],
      status: [],
      startDate: "",
      endDate: "",
    });

    // Uncheck all the checkboxes
    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Clear the date inputs
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";

    // reset the filter and message
    setFilters({
      type: [],
      status: [],
      startDate: "",
      endDate: "",
    });
    setFilterMessage("All transactions");
  };

  // Handle the date range button clicks
  const handleDateRange = (range) => {
    const today = new Date();
    let startDate = today;
    let endDate = today;
    let message = "Your transactions for the last 7 days";

    switch (range) {
      case "today":
        startDate = endDate = today;
        message = "Your transactions for today";

        break;
      case "last7days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        message = "Your transactions for the last 7 days";
        break;
      case "thisMonth":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        message = "Your transactions for this month";
        break;
      case "last3Months":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 3);
        message = "Your transactions for the last 3 months";
        break;
      default:
        break;
    }

    setFilters({
      ...filters,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
    setFilterMessage(message);
  };

  return (
    <>
      {isActive && (
        <div className="filter-backdrop" onClick={toggleFilter}></div>
      )}

      <div className={`filter-drawer ${isActive ? "active" : ""}`}>
        <div className="filter-drawer-header">
          <h3>Filter</h3>

          <IoMdClose className="close-icon" onClick={toggleFilter} />
        </div>
        <div className="filter-body">
          {/* Date Range Buttons */}
          <div className="date-range-buttons">
            <button onClick={() => handleDateRange("today")}>Today</button>
            <button onClick={() => handleDateRange("last7days")}>
              Last 7 Days
            </button>
            <button onClick={() => handleDateRange("thisMonth")}>
              This Month
            </button>
            <button onClick={() => handleDateRange("last3Months")}>
              Last 3 Months
            </button>
          </div>

          {/* Start and End Date */}
          <div className="date-selection">
            <label>Date Range</label>
            <div className="input-date">
              <input type="date" id="start-date" />
              <input type="date" id="end-date" />
            </div>
          </div>

          {/* Transaction Type */}
          <div className="transaction-type">
            <label>Transaction Type</label>
            <div className="checkbox-group">
              <div
                className="dropdown-header"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className={isOpen ? "expanded" : "collapsed"}>
                  {transactionTypes.slice(0, 3).join(", ")}
                  {transactionTypes.length > 3 && "..."}
                </span>
                <RiArrowDropDownLine
                  className={`dropdown-icon ${isOpen ? "open" : ""}`}
                />
              </div>
              {isOpen && (
                <div className="checkbox-container">
                  {transactionTypes.map((type, index) => (
                    <label key={index} className="checkbox-label">
                      <input type="checkbox" id={type} value={type} />
                      <span className="checkbox-text">{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Transaction Status */}
          <div className="transaction-status">
            <label>Transaction Status</label>
            <div className="checkbox-group">
              <div
                className="dropdown-header"
                onClick={() => setIsClick(!isClick)}
              >
                <span className={isClick ? "expanded" : "collapsed"}>
                  {transactionStatus.slice(0, 3).join(", ")}
                  {transactionStatus.length > 3 && "..."}
                </span>
                <RiArrowDropDownLine
                  className={`dropdown-icon ${isClick ? "open" : ""}`}
                />
              </div>
              {isClick && (
                <div className="checkbox-container">
                  {transactionStatus.map((status, index) => (
                    <label key={index} className="checkbox-label">
                      <input type="checkbox" id={status} value={status} />
                      <span className="checkbox-text">{status}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filter-footer">
          <button className="clear-btn" onClick={handleClearFilters}>
            Clear
          </button>
          <button className="apply-btn" onClick={handleApplyFilters}>
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
