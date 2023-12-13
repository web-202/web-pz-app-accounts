import React from "react";
import './style/style.scss'
import { Button, Table } from 'react-bootstrap'
import NewAccount from "./NewAccount/NewAccount";
import EditAccount from "./EditAccount/EditAccount";

const Accounts: React.FC = () => {
    return <>
        <div className="container">
            <div className="top-container">
                <div className="title-list">
                    Account list
                </div>
                <div className="btn-block">
                    <NewAccount/>
                </div>
            </div>
            <div className="count-container">
                Total: 24
            </div>
            <div className="table">
                <Table striped hover variant="light">
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
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>
                            <div className="status active-acc">
                                Active
                            </div>
                            <div className="status disable-acc">
                                Disable
                            </div>
                            <div className="status pending-acc">
                                Pending
                            </div>

                        </td>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td><EditAccount/></td>
                        <td><Button className="remove-btn">Delete</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    </>
}   

export default Accounts;