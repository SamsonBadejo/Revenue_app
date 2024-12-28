import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { IoIosArrowDown } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import axios from "axios";

import SuccessImg from "../../Assets/Received.png";
import FailedImg from "../../Assets/Declined.png";
import Loader from "../Loader/Loader";

import Filter from "../Filter/Filter";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filters, setFilters] = useState({
    type: [],
    status: [],
    startDate: "",
    endDate: "",
  });

  const [filterMessage, setFilterMessage] = useState(
    "Your transactions for the last 7 days"
  );

  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  // Fetch transactions when component mounts
  useEffect(() => {
    axios
      .get("https://fe-task-api.mainstack.io/transactions")
      .then((response) => {
        setTransactions(response.data);
        setFilteredTransactions(response.data); // Initialize with all transactions
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch transactions!");
        setLoading(false);
      });
  }, []);

  // Filter transactions based on selected filters
  useEffect(() => {
    let filtered = [...transactions];

    // Filter by transaction type
    if (filters.type.length > 0) {
      filtered = filtered.filter((transaction) =>
        filters.type.includes(transaction.metadata?.product_name)
      );
    }

    // Filter by transaction status
    if (filters.status.length > 0) {
      filtered = filtered.filter((transaction) =>
        filters.status.includes(transaction.status)
      );
    }

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= new Date(filters.startDate) &&
          transactionDate <= new Date(filters.endDate)
        );
      });
    }

    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="transactions-container">
        <div className="transactions-number">
          <h2>{filteredTransactions.length} Transactions</h2>
          <p>{filterMessage}</p>
        </div>
        <div className="filter-container">
          <div className="filter" onClick={toggleFilter}>
            <p>Filter</p>
            <IoIosArrowDown className="arrow-icon" />
          </div>

          {isFilterActive && (
            <Filter
              isActive={isFilterActive}
              toggleFilter={toggleFilter}
              setFilters={setFilters}
              setFilterMessage={setFilterMessage}
            />
          )}
          <div className="filter">
            <p>Export list</p>
            <HiDownload className="download-icon" />
          </div>
        </div>
      </div>
      <hr />
      <div className="all-transactions">
        {filteredTransactions.length === 0 ? (
          <ErrorMessage />
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.payment_reference}
              className="transaction-item"
            >
              <div className="img-info">
                <img
                  src={
                    transaction.status === "successful" ? SuccessImg : FailedImg
                  }
                  alt={transaction.status}
                />
                <div className="info">
                  <h5>
                    {transaction.metadata?.product_name || "Unknown Product"}
                  </h5>
                  <p>{transaction.metadata?.name || "Unknown Name"}</p>
                </div>
              </div>
              <div className="amount-date">
                <h5>USD {transaction.amount}</h5>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
