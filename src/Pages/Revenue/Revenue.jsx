import React from "react";
import Chart from "../../Components/Chart/Chart";
import AppIcon from "../../Components/App/AppIcon";
import "./Revenue.css";
import LedgerBalance from "../../Components/Ledger/LedgerBalance";
import Transactions from "../../Components/Transactions/Transactions";

const Revenue = () => {
  return (
    <div class="">
      <AppIcon />{" "}
      <div class="container">
        <div className="revenue">
          <Chart />
          <LedgerBalance />
        </div>
        <Transactions />
      </div>
    </div>
  );
};

export default Revenue;
