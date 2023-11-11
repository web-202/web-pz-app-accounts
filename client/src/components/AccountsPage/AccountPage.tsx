import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import Header from "../Header/Header";
import './AccountPage.scss';

type Account = {
  id: number;
  name: string,
  account_name: string,
  email: string;
  status: string,
  start_date: number,
  expiration_date: number;
};

function AccountPage() {
  const {id} = useParams<{ id: string }>();
  const [account, setAccount] = useState<Account>();
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState(new Date());
  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    try {
      const {data}: AxiosResponse<Account> = await axios.get<Account>(`http://localhost:5000/accounts/${id}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      setAccount(data);
      setStartDate(new Date(data.start_date / 1000))
      console.log(new Date(data.start_date / 1000).toISOString())
      setExpirationDate(new Date(data.expiration_date / 1000))
      setIsLoading(false);

    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div>
      {account && (
        <>
          <Header currentPage={'/profile'}/>
          <div className="account-page">
            <div className="account-header">
            </div>
            <div className="account-content">
              <h1>{account.name}</h1>
              <p>Name: {account.name}</p>
              <p>Account name: {account.account_name}</p>
              <p>E-mail: {account.email}</p>
              <p>Status: {account.status}</p>

              <p>Start date: {new Date(startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</p>
              <p>Expiration date: {new Date(expirationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountPage;
