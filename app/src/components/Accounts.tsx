import React, { useState, useEffect } from "react";
import "../styles/Account.css";
import axios from "axios";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/accounts")
      .then((response) => {
        setAccounts(response.data as Account[]);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        console.log(error.response?.status);
      })
      .finally(() => {
        setLoading(false);
      });
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

        {loading ? (
          <p>Loading...</p>
        ) : accounts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <NavLink
                    className="linksName"
                    to={{ pathname: `/accounts/${account.id}` }}>
                    <td>{account.name}</td>
                  </NavLink>
                  <td>{account.account_name}</td>
                  <td>{account.email}</td>
                  <td>{account.status}</td>
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
                      <button className="btnEdit">Edit</button>
                      <button className="btnDelete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No accounts found.</p>
        )}
      </div>
    </div>
  );
}
