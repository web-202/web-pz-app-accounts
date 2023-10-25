import React, { useState, useEffect } from "react";
import "../styles/Account.css";
import axios from "axios";
interface Account {
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

  useEffect(() => {
    try {
      const response = axios
        .get("http://localhost:3000/accounts")
        .then((response) => {
          setAccounts(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          console.log(error.response.status);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="accounts">
      <div className="accountUp">
        <h1 className="account-title">Account list</h1>
        <button className="newAccountBtn">Create account</button>
      </div>

      <div className="main-container">
        <div className="main__total">
          <p className="main__total-title">Total: {accounts.length}</p>
        </div>
        <hr className="main__hr" />

        {accounts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expiration Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td>{account.account_name}</td>
                  <td>{account.email}</td>
                  <td>{account.status}</td>
                  <td>{account.start_date}</td>
                  <td>{account.expiration_date}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
