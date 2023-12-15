import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Accounts from './components/Accounts/Accouts';
import About from './components/About/Abouts';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountProfile from './components/Account/Account';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path='/accounts' element={<Accounts />} />
        <Route path='/about' element={<About />} />
        <Route path='/account/:id' element={<AccountProfile/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
