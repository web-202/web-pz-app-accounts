import React, { useState, useEffect } from "react";
import "../styles/Account.css";
import axios from "axios";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import EditModal from "./EditModal";

export interface Account {
  id: number;
  name: string;
  account_name: string;
  email: string;
  status: string;
  start_date: string | number;
  expiration_date: string | number;
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>();

  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) document.body.classList.add("scroll");
  else if (!isOpen) document.body.classList.remove("scroll");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounts");
        const sortedAccounts = response.data as Account[];
        sortedAccounts.sort((a, b) => b.id - a.id);
        setAccounts(sortedAccounts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        console.log(error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const isCloseFunc = () => {
    setIsOpen(false);
  };

  const isOpenFunc = () => {
    setIsOpen(true);
  };

  const openEditModal = (account: Account) => {
    setSelectedAccount(account);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedAccount(null);
  };

  const updateAccountList = (newUser: Account) => {
    const updatedAccounts = [...accounts];
    const existingAccountIndex = updatedAccounts.findIndex(
      (account) => account.id === newUser.id
    );
    if (existingAccountIndex !== -1) {
      updatedAccounts[existingAccountIndex] = newUser;
    } else {
      updatedAccounts.push(newUser);
    }

    updatedAccounts.sort((a, b) => b.id - a.id);

    setAccounts(updatedAccounts);
  };

  const handleDeleteAccount = (account: Account) => {
    // Trigger the API call to delete the account
    axios
      .delete(`http://localhost:3001/accounts/${account.id}`)
      .then(() => {
        // Remove the deleted account from the UI
        const updatedAccounts = accounts.filter((a) => a.id !== account.id);
        setAccounts(updatedAccounts);
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  function status(status: string) {
    if (status === "Active") return "blue status";
    else if (status === "Disable") return "yellow status";
    else if (status === "Pending") return "red status";
  }

  return (
    <div className="accounts">
      <div className="accountUp">
        <h1 className="account-title">Account list</h1>
        <button className="newAccountBtn" onClick={isOpenFunc}>
          Create account
        </button>
        <Modal
          isOpen={isOpen}
          isClose={isCloseFunc}
          updateAccountList={updateAccountList}
        >
          <></>
        </Modal>
      </div>

      {selectedAccount && (
        <EditModal
          isOpen={isEditOpen}
          isClose={closeEditModal}
          updateResult={updateAccountList}
          resultToEdit={selectedAccount}
        />
      )}

      <div className="main-container">
        <div className="main__total">
          <p className="main__total-title">Total: {accounts.length}</p>
        </div>
        <hr className="main__hr" />

        {loading ? (
          <p>Loading...</p>
        ) : accounts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Name</th>
                <th className="email">Email</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>
                    <NavLink
                      className="linksName"
                      to={{ pathname: `/accounts/${account.id}` }}
                    >
                      <span>{account.name}</span>
                    </NavLink>
                  </td>

                  <td>{account.account_name}</td>

                  <td className="email">{account.email}</td>

                  <td>
                    <span className={status(account.status)}>
                      {account.status}
                    </span>
                  </td>

                  <td>
                    {format(
                      new Date((account.start_date as number) * 1000),
                      "dd MMM yyyy"
                    )}
                  </td>

                  <td>
                    {format(
                      new Date((account.expiration_date as number) * 1000),
                      "dd MMM yyyy"
                    )}
                  </td>

                  <td>
                    <div className="btns">
                      <button
                        className="btnEdit"
                        onClick={() => openEditModal(account)}
                      >
                        Edit
                      </button>
                      <button
                        className="btnDelete"
                        onClick={() => handleDeleteAccount(account)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="red-text">No accounts found.</p>
        )}
      </div>
    </div>
  );
}
