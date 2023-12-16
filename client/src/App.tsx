import React from 'react';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import Accounts from "./pages/Accounts/Accounts";
import About from "./pages/About/About";
import './App.css';
import AccountPage from "./components/AccountsPage/AccountPage";
import Modal from "react-modal";

function App() {
  Modal.setAppElement('#root');


  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Accounts/>}/>
        <Route path={'/about'} element={<About/>}/>
        <Route path={'/accounts/:id'} element={<AccountPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
