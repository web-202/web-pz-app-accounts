import React, { useEffect, useState } from "react"
import Account from "../../domain/Account"
import { useParams } from "react-router-dom"
import HttpAccounts from "../../http/http-accounts"
import "./style/style.scss"

const AccountProfile: React.FC = () => {
    const [account, setAccount] = useState<Account | null>(null);
    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
      const fetchAccount = async () => {
        try {
            if(id){
                const accountId = parseInt(id, 10);
                const fetchedAccount = await HttpAccounts.getAccount(accountId);
                setAccount(fetchedAccount);
            }
        } catch (error) {
          console.error('Error fetching account:', error);
        }
      };
  
      if (id) {
        fetchAccount();
      }
    }, [id]);
    
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

    if (!account) {
      return <div>Loading...</div>;
    }

    return <>
        <div className="header">
        </div>
        <div className="container">
            <p className="items-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" color="orange" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <span className="attr-account">
                    Name:
                </span> 
                {account.name}
            </p>
            <p className="items-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" color="orange" viewBox="0 0 16 16">
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                </svg>
                <span className="attr-account">
                Accoint name:</span> {account.name}</p>
            <p className="items-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" color="orange" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
                <span className="attr-account">E-mail:</span> {account.email}</p>
            <p className="items-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" color="orange" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>
                <span className="attr-account">Status:</span> 
                <div className={`status ${getStatusClassName(account.status )}`}>
                    {account.status}
                </div> 
            </p>
            <p className="items-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" color="orange" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
            </svg>
            <span className="attr-account">Start date:</span> {new Date(account.start_date * 1000).toDateString()}</p>
            <p className="items-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" color="orange" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                </svg>
                <span className="attr-account">Expiration date:</span> {new Date(account.expiration_date * 1000).toDateString()}</p>
        </div>
    </>
}

export default AccountProfile