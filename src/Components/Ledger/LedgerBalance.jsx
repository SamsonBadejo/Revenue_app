import React, { useEffect, useState } from "react";
import "./LedgerBalance.css";
import { CiCircleInfo } from "react-icons/ci";

const LedgerBalance = () => {
  const [ledgerBalance, setLedgerBalance] = useState("Loading...");
  const [totalPayout, setTotalPayout] = useState("Loading...");
  const [totalRevenue, setTotalRevenue] = useState("Loading...");
  const [pendingPayout, setPendingPayout] = useState("Loading...");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch("https://fe-task-api.mainstack.io/wallet"); // Replace with your API URL
        const data = await response.json();

        setLedgerBalance(data.ledger_balance || "0.00");
        setTotalPayout(data.total_payout || "0.00");
        setTotalRevenue(data.total_revenue || "0.00");
        setPendingPayout(data.pending_payout || "0.00");
      } catch (error) {
        console.error("Error fetching data:", error);
        setLedgerBalance("Error");
        setTotalPayout("Error");
        setTotalRevenue("Error");
        setPendingPayout("Error");
      }
    };

    fetchBalances();
  }, []);

  return (
    <div className="ledger-balance">
      <div className="balance-section">
        <div className="balance">
          <p>Ledger Balance</p>
          <CiCircleInfo className="info-icon" />
        </div>
        <h1 className="amount">USD {ledgerBalance}</h1>
      </div>

      <div className="balance-section">
        <div className="balance">
          <p>Total Payout</p>
          <CiCircleInfo className="info-icon" />
        </div>
        <h1 className="amount">USD {totalPayout}</h1>
      </div>

      <div className="balance-section">
        <div className="balance">
          <p>Total Revenue</p>
          <CiCircleInfo className="info-icon" />
        </div>
        <h1 className="amount">USD {totalRevenue}</h1>
      </div>

      <div className="balance-section">
        <div className="balance">
          <p>Pending Payout</p>
          <CiCircleInfo className="info-icon" />
        </div>
        <h1 className="amount">USD {pendingPayout}</h1>
      </div>
    </div>
  );
};

export default LedgerBalance;
