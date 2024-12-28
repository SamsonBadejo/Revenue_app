import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Revenue from "./Pages/Revenue/Revenue";
import RootLayout from "./Components/RootLayout";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="revenue" element={<Revenue />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
