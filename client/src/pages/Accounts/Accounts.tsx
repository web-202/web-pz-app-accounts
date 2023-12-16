import React from 'react';
import Header from "../../components/Header/Header";
import AccountsTable from "../../components/AccountsTable/AccountsTable";
import './Accounts.scss';

function Accounts() {
    return (
        <>
            <Header currentPage={'accounts'}/>
            <div className={'accounts'}>
                <AccountsTable/>
            </div>
        </>
    );
}

export default Accounts;
