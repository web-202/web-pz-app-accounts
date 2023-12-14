import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import './AccountsTable.scss';
import Account from "./Account";
import Modal from 'react-modal';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Account = {
  id: number;
  name: string,
  account_name: string,
  email: string;
  status: string,
  start_date: number,
  expiration_date: number;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function AccountsTable() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [accounts, setAccounts] = useState<Account[]>();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [name, setName] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [select, setSelect] = useState<string>('');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateExpiration, setDateExpiration] = useState(new Date());

  const [nameError, setNameError] = useState<boolean>(false);
  const [accountNameError, setAccountNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  useEffect(() => {
    getAccounts();
  }, []);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  const getAccounts = async () => {
    try {
      const {data}: AxiosResponse<Account[]> = await axios.get<Account[]>('http://localhost:5000/accounts', {
        headers: {
          Accept: 'application/json',
        },
      });
      setAccounts(data)

    } catch (e) {
      console.log(e)
    }
  }

  const createAccount = async () => {
    try {
      if (name === '') {
        toast("Write name!");
        return;
      }
      if (accountName === '') {
        toast("Write account name!");
        return
      }
      if (!emailPattern.test(email)) {
        toast("Write correct email!");
        return;
      }

      const user = {
        name: name,
        account_name: accountName,
        email: email,
        status: select,
        start_date: new Date(dateStart).getTime() / 1000,
        expiration_date: new Date(dateExpiration).getTime() / 1000
      }
      setName('');
      setAccountName('');
      setEmail('');
      const {data} = await axios.post('http://localhost:5000/accounts', user);
      await getAccounts();
      setIsOpen(false)

    } catch (e) {

    }
  }


  return (
    <div className={'accounts-table'}>
      <div className="accounts-header">
        <h2>Accounts list</h2>
        <button className={'btn-create-account'} onClick={openModal}>Create account</button>
      </div>
      <div className="accounts-size">
        <p>Total: {accounts && accounts.length}</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Create account</h2>
        <div className={'modal'}>
          <p>Name*</p>
          <input type={'text'} value={name} onChange={(e) => setName(e.target.value)}/>
          <p>Account*</p>
          <input type={'text'} value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
          <p>Example select</p>
          <select onChange={(e) => setSelect(e.target.value)}
          >
            <option value={'Disable'}>Disable</option>
            <option value={'Pending'}>Pending</option>
            <option value={'Active'}>Active</option>
          </select>
          <p>Email*</p>
          <input type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>

          <div className="container-date">
            <div className="start-date">
              <p>Start date</p>
              <input value={dateStart.toISOString().split('T')[0]} type={'date'}
                     onChange={(e) => setDateStart(new Date(e.target.value))}/>
            </div>
            <div className="expiration-date">
              <p>Expiration date</p>
              <input value={dateExpiration.toISOString().split('T')[0]} type={'date'}
                     onChange={(e) => setDateExpiration(new Date(e.target.value))}
                     min={dateStart.toISOString().split('T')[0]}/>
            </div>
          </div>
          <div className="btn-nav-modal">
            <button className={'del-btn'} onClick={closeModal}>Cancel</button>
            <button className={'edit-btn'} onClick={createAccount}>Save</button>
          </div>
        </div>
      </Modal>
      <div className="account-table-wrapper">
        <table className="account-table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Account name</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Start date</th>
            <th>Expiration date</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {accounts && accounts.map((account, index) => (
            <Account key={account.id} id={account.id} name={account.name}
                     account_name={account.account_name}
                     email={account.email} status={account.status} start_date={account.start_date}
                     expiration_date={account.expiration_date} getAccounts={getAccounts}/>
          ))}
          </tbody>
        </table>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default AccountsTable;
