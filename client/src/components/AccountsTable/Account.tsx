import React, {FC, useState} from 'react';
import './Account.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {toast, ToastContainer} from "react-toastify";

interface AccountProps {
  id: number,
  name: string,
  account_name: string,
  email: string;
  status: string,
  start_date: number,
  expiration_date: number,
  getAccounts: (any),
}

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


const Account: FC<AccountProps> = ({
                                     id,
                                     name,
                                     account_name,
                                     email,
                                     status,
                                     start_date,
                                     expiration_date,
                                     getAccounts
                                   }) => {

  const navigate = useNavigate();

  const [nameEdit, setNameEdit] = useState(name);
  const [accountNameEdit, setAccountNameEdit] = useState(account_name);
  const [emailEdit, setEmailEdit] = useState(email);
  const [startDateEdit, setStartDateEdit] = useState(new Date(start_date * 1000));
  const [expirationDateEdit, setExpirationDateEdit] = useState(new Date(expiration_date * 1000));
  const [select, setSelect] = useState(status);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const deleteAccounts = async () => {
    try {
      await axios.delete(`http://localhost:5000/accounts/${id}`);
      await getAccounts();
    } catch (e) {
      console.log(e)
    }
  }

  const changeAccount = async () => {
    try {

      if (nameEdit === '') {
        toast("Write name!");
        return;
      }
      if (accountNameEdit === '') {
        toast("Write account name!");
        return
      }
      if (!emailPattern.test(emailEdit)) {
        toast("Write correct email!");
        return;
      }
      const accountUpdate = {
        name: nameEdit,
        account_name: accountNameEdit,
        email: emailEdit,
        status: select,
        start_date: new Date(startDateEdit).getTime() / 1000,
        expiration_date: new Date(expirationDateEdit).getTime() / 1000
      }
      await axios.put(`http://localhost:5000/accounts/${id}`, accountUpdate);
      await getAccounts();
      setIsOpen(false)
    } catch (e) {
      console.log(e)
    }
  }

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  const navigateToAccount = () => {
    navigate(`/accounts/${id}`)
  }


  return (
    <>
      <tr className={'account'}>
        <td onClick={navigateToAccount}><p className={'account-name'}>{name}</p></td>
        <td><p>{account_name}</p></td>
        <td><p>{email}</p></td>
        <td><p className={`status ${status}`}>{status}</p></td>
        <td><p>{new Date(startDateEdit).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}</p></td>
        <td><p>{new Date(expirationDateEdit).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}</p></td>
        <td>
          <div className="btn-communication">
            <button className={'edit-btn'} onClick={() => setIsOpen(true)}>Edit</button>
            <button className={'del-btn'} onClick={deleteAccounts}>Delete</button>
          </div>
        </td>
      </tr>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Update account</h2>
        <div className={'modal'}>
          <p>Name*</p>
          <input value={nameEdit} onChange={(e) => setNameEdit(e.target.value)}/>
          <p>Account*</p>
          <input type={'text'} value={accountNameEdit} onChange={(e) => setAccountNameEdit(e.target.value)}/>
          <p>Example select</p>
          <select onChange={(e) => setSelect(e.target.value)}
          >
            <option value={'Disable'}>Disable</option>
            <option value={'Pending'}>Pending</option>
            <option value={'Active'}>Active</option>
          </select>
          <p>Email*</p>
          <input type={'text'} value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)}/>

          <div className="container-date">
            <div className="start-date">
              <p>Start date</p>
              <input value={startDateEdit && new Date(startDateEdit).toISOString().split('T')[0]} type={'date'}
                     onChange={(e) => setStartDateEdit(new Date(e.target.value))}/>
            </div>
            <div className="expiration-date">
              <p>Expiration date</p>
              <input value={new Date(expirationDateEdit).toISOString().split('T')[0]} type={'date'}
                     onChange={(e) => setExpirationDateEdit(new Date(e.target.value))}
                     min={startDateEdit.toISOString().split('T')[0]}/>
            </div>
          </div>
          <div className="btn-nav-modal">
            <button className={'del-btn'} onClick={closeModal}>Cancel</button>
            <button className={'edit-btn'} onClick={changeAccount}>Change</button>
          </div>
        </div>
      </Modal>
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
    </>
  );
}

export default Account;
