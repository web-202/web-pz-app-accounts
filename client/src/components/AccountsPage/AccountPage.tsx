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
  start_date: string,
  expiration_date: string;
};

function AccountPage() {
  const {id} = useParams<{ id: string }>();
  const [account, setAccount] = useState<Account>();

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
              <p className={'account-name'}>{account.name}</p>
              <p>Name: {account.name}</p>
              <p>Account name: {account.account_name}</p>
              <p>E-mail: {account.email}</p>
              <p>Status: {account.status}</p>
              <p>Start date: {account.start_date}</p>
              <p>Expiration date: {account.expiration_date}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountPage;
