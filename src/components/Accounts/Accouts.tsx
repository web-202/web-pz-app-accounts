import React, { useEffect, useState } from "react";
import './style/style.scss'
import { Button, Table } from 'react-bootstrap'
import NewAccount from "./NewAccount/NewAccount";
import EditAccount from "./EditAccount/EditAccount";
import HttpAccounts from "../../http/http-accounts";
import Account from "../../domain/Account";
import RemoveAccountButton from "./RemoveAccount/RemovaAccount";
import { Link } from "react-router-dom";

const Accounts: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
      const fetchAccounts = async () => {
        try {
          const fetchedAccounts = await HttpAccounts.getAccounts();
          setAccounts(fetchedAccounts);
        } catch (error) {
          console.log('Error fetching accounts:', error);
        }
      };
  
      fetchAccounts();
    }, []);
    
    
    const count = (): number => {
      let count: number = 0
      for (let acc in accounts){
        count++;
      }
      
      return count
    }
    
    const lastIdAcc = (): number => {
      return count()+1;
    }

    const getStatusClassName = (status: string) => {
        if (status === 'Active') {
          return 'active-acc';
        } else if (status === 'Disable') {
          return 'disable-acc';
        } else if (status === 'Pending') {
          return 'pending-acc';
        }
        return '';
      };

    return <>
        <div className="container">
            <div className="top-container">
                <div className="title-list">
                    Account list
                </div>
                <div className="btn-block">
                    <NewAccount id={lastIdAcc()}/>
                </div>
            </div>
            <div className="count-container">
                Total: {count()}
            </div>
            <div className="table">
                <Table hover variant="light">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Account name</th>
                            <th>E-mail</th>
                            <th>Status</th>
                            <th>Start date</th>
                            <th>Expiration date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id}>
                                  <td> 
                                    <Link to={`/account/${account.id}`}>
                                      {account.name}
                                    </Link>
                                  </td>
                                  <td>{account.account_name}</td>
                                  <td>{account.email}</td>
                                  <div className={`status ${getStatusClassName(account.status)}`}>
                                      {account.status}
                                  </div>
                                  <td>{new Date(account.start_date * 1000).toDateString()}</td>
                                  <td>{new Date(account.expiration_date * 1000).toDateString()}</td>
                                <td><EditAccount account={account}/></td>
                                <td><RemoveAccountButton accountId={account.id}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    </>
}   

export default Accounts;