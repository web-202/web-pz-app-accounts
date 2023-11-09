import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Layouts from './layouts';
import Accounts from './components/accounts';
import AboutUs from './components/aboutUs';
import Profile from './components/profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layouts/>}> 
        <Route path='/account' element={<Accounts/>}/>
        <Route path='/about/us' element={<AboutUs/>}/>
      </Route>
      <Route path='/profile/:id' element={<Profile/>}/>
    </Routes>
  );
}

export default App;
