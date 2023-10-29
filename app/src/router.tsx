import React from "react";
import { Route, Routes } from "react-router";
import Header from "./layouts/Header";
import Accounts from "./components/Accounts";
import Profile from "./components/Profile";
import AboutUs from "./components/AboutUs";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index path="/accounts" element={<Accounts />} />
        <Route path="/about/us" element={<AboutUs />} />
        <Route path="/accounts/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}
