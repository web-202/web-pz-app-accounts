import { Button } from "react-bootstrap"
import { AccountList } from "./AccountList"
import { Account } from "../models/models"
import { useEffect, useState } from "react"
import axios from 'axios'
import { CreateModal } from "./CreateModal"

type Props = {}

export const Accounts = (props: Props) => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [isCreateShow, setIsCreateShow] = useState<boolean>(false)

    const save = (account: Account) => {
        axios.post("http://localhost:3000/accounts").then((res) => {
            renew();
        })
    }

    const renew = () => {
        axios.get("http://localhost:3000/accounts").then((res) => {
            setAccounts(res.data)
        })
    }

    useEffect(() => {
        renew()
    }, [])

    return (
        <div className='container'>
            <div className="d-flex flex-row justify-content-between mb-3">
                <div className="fs-4">Account List</div>
                <Button onClick={() => setIsCreateShow(true)}>Create Account</Button>
            </div>

            <div className="bg-primary p-4 mb-3">
                <div className="text-white">Total: {accounts.length}</div>
            </div>
            <AccountList renew={renew} accounts={accounts} />
            <CreateModal isShow={isCreateShow} setIsShow={setIsCreateShow} save={save} />
        </div>
    )
}