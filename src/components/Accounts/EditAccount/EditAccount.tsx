import React, { useState, ChangeEventHandler } from "react";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import HttpAccounts from "../../../http/http-accounts";
import Account from "../../../domain/Account";

interface EditAccountFormProps {
    account: Account
}

const EditAccount: React.FC<EditAccountFormProps> = ({account}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const today = new Date().toISOString().split('T')[0]; 

    const [accountData, setAccountData] = useState<Account>({
        id: account.id,
        name: account.name,
        account_name: account.account_name,
        email: account.email,
        status: account.status,
        start_date: account.start_date,
        expiration_date: account.expiration_date,
      });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({
        name: '',
        account_name: '',
        email: '',
        status: '',
        start_date: '',
        expiration_date: '',
      });

      const handleInputChange: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'start_date' || name === 'expiration_date') {
            const date = new Date(value);
            const unixTimestamp = Math.floor(date.getTime() / 1000);
        
            setAccountData((prevData) => ({
              ...prevData,
              [name]: unixTimestamp,
            }));
          } else {
            setAccountData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }
        
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', 
          }));
      };

      const handleSubmit = async () => {
        try {
            const errors: Record<string, string> = {};
            
            if(accountData.name === ''){
                errors.name = 'Name is required!';
            } if(accountData.account_name === ''){
                errors.account_name = 'Account name is required!';
            } if(accountData.email === ''){
                errors.email = 'Email is required!';
            } if(accountData.expiration_date === 0){
                errors.expiration_date = 'Expiration date is required!';
            } if(accountData.start_date === 0){
                errors.start_date = 'Start date is required!';
            } if(accountData.status === ''){    
                errors.status = 'Status is required!';
            }

            setValidationErrors(errors);

            if (Object.keys(errors).length === 0) {
                window.location.reload();
                await HttpAccounts.editAccount(accountData);
                setAccountData({
                  id: 0,
                  name: '',
                  account_name: '',
                  status: '',
                  email: '',
                  start_date: 0,
                  expiration_date: 0,
                });
            }
        } catch (error) {
          console.error('Error creating account:', error);   
        }
      };

    return <>
       <Button className="edit-btn" variant="primary" onClick={handleShow}>
            Edit
        </Button>  

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={accountData.name}
                            onChange={handleInputChange}
                            autoFocus
                            required
                        />
                        {validationErrors.name && <div className="error">{validationErrors.name}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Account*</Form.Label>
                        <Form.Control
                            type="text"
                            name='account_name'
                            value={accountData.account_name}
                            onChange={handleInputChange}
                            autoFocus 
                            required
                        />
                        {validationErrors.account_name && <div className="error">{validationErrors.account_name}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status*</Form.Label>
                        <Form.Select 
                            aria-label="Default select example"  
                            name="status"
                            value={accountData.status}
                            onChange={handleInputChange}
                            defaultValue=''         
                            autoFocus
                            required
                        >
                            <option value=''>Open this select menu</option>
                            <option value="Active">Active</option>
                            <option value="Disable">Disable</option>
                            <option value="Pending">Pending</option>
                        </Form.Select>
                        {validationErrors.status && <div className="error">{validationErrors.status}</div>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail*</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            value={accountData.email}
                            onChange={handleInputChange}                             
                            autoFocus
                            required
                        />
                        {validationErrors.email && <div className="error">{validationErrors.email}</div>}
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                            <Form.Label>Start date*</Form.Label>
                            <Form.Control
                                type="date"
                                name='start_date'
                                value={new Date(accountData.start_date * 1000).toISOString().split('T')[0]}
                                onChange={handleInputChange}         
                                autoFocus                               
                                min={today}
                                required
                            />
                            {validationErrors.start_date && <div className="error">{validationErrors.start_date}</div>}
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Expiration date*</Form.Label>
                            <Form.Control
                                type="date"
                                autoFocus
                                name='expiration_date'
                                value={new Date(accountData.expiration_date * 1000).toISOString().split('T')[0]}
                                onChange={handleInputChange}                                       
                                min={today}
                                required
                            />
                            {validationErrors.expiration_date && <div className="error">{validationErrors.expiration_date}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default EditAccount;