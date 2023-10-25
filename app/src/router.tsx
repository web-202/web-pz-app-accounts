import React from "react";
import { Route, Routes } from "react-router";
import Header from "./layouts/Header";
import Accounts from "./components/Accounts";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index path="/accounts" element={<Accounts />} />
        <Route path="/about/us" element={<h1>About Us</h1>} />
      </Route>
    </Routes>
  );
}
