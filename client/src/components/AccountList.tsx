import { Table } from 'react-bootstrap'
import { Account } from '../models/models'
import { AccountListItem } from './AccountListItem'
type Props = {
    accounts: Account[],
    renew: () => void,
}

export const AccountList = (props: Props) => {

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Name</th>
                        <th>E-mail</th>
                        <th>Status</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.accounts.map(account => (
                        <AccountListItem renew={props.renew} key={account.id} account={account} />
                    ))}

                </tbody>
            </Table>

        </>
    )
}