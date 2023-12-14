import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { Account } from '../models/models'
import axios from 'axios'
import { stringDateToNumber, stringNumberToDate, validateAccount } from '../utils'

type Props = {
    account: Account
    isShow: boolean
    setIsShow: (bool: boolean) => void,
    renew: () => void,
}



export const EditModal = (props: Props) => {
    const [account, setAccount] = useState<Account>({ ...props.account, start_date: stringNumberToDate(props.account.start_date), expiration_date: stringNumberToDate(props.account.expiration_date) })
    const [errors, setErrors] = useState<string[]>([])

    const close = () => {
        setAccount(props.account)
        props.setIsShow(false)
    }

    const save = () => {
        const errors = validateAccount(account)

        if (errors.length > 0) {
            setErrors(errors)
            return;
        }


        const id = props.account.id;
        axios.put(`http://localhost:3000/accounts/${id}`, { ...account, start_date: stringDateToNumber(account.start_date), expiration_date: stringDateToNumber(account.expiration_date) }).then((res) => {
            props.setIsShow(false)
            props.renew()
        })
    }

    return (
        <Modal size="lg" show={props.isShow} onHide={() => close()}>
            <Modal.Header closeButton>
                <Modal.Title>Create Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel className="mb-3" label={"Name"}>
                    <Form.Control
                        className={`${errors.includes("name") && "border border-danger"}`}
                        placeholder='Name'
                        value={account.name}
                        onChange={(e) => setAccount({ ...account, name: e.target.value })}
                    />
                </FloatingLabel>

                <FloatingLabel className="mb-3" label={"Account"}>
                    <Form.Control
                        className={`${errors.includes("account_name") && "border border-danger"}`}
                        placeholder='Account'
                        value={account.account_name}
                        onChange={(e) => setAccount({ ...account, account_name: e.target.value })}
                    />
                </FloatingLabel>

                <Form.Select
                    className='mb-3 p-3'
                    onChange={(e) => setAccount({ ...account, status: e.target.value })}
                    value={account.status}
                >
                    <option value="Pending">Pending</option>
                    <option value="Disable">Disable</option>
                    <option value="Active">Active</option>
                </Form.Select>

                <FloatingLabel className="mb-3" label={"Email"}>
                    <Form.Control
                        className={`${errors.includes("email") && "border border-danger"}`}
                        placeholder='Email'
                        value={account.email}
                        onChange={(e) => setAccount({ ...account, email: e.target.value })}
                    />
                </FloatingLabel>

                <div className='d-flex gap-3'>
                    <FloatingLabel className="mb-3 w-100" label={"Start Date"}>
                        <Form.Control
                            className={`${errors.includes("start_date") && "border border-danger"}`}
                            type='date'
                            placeholder='Start Date'
                            value={account.start_date}
                            onChange={(e) => setAccount({ ...account, start_date: e.target.value })}
                        />
                    </FloatingLabel>
                    <FloatingLabel className="mb-3 w-100" label={"End Date"}>
                        <Form.Control
                            className={`${errors.includes("expiration_date") && "border border-danger"}`}
                            type='date'
                            placeholder='End Date'
                            value={account.expiration_date}
                            onChange={(e) => setAccount({ ...account, expiration_date: e.target.value })}
                        />
                    </FloatingLabel>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"
                    onClick={() => save()}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}