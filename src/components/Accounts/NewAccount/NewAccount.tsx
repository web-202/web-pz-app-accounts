import React, { useState, ChangeEventHandler, useEffect} from "react"
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import Account from "../../../domain/Account";
import HttpAccounts from "../../../http/http-accounts";
import './style/style.scss'

interface DateState {
    start_date: string;
    expiration_date: string;
}

interface ExpirationDateState {
    expiration_date: string;
}

interface NewAccountFormProps {
    id: number
}

const NewAccount: React.FC<NewAccountFormProps> = ({id}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let today = new Date().toISOString().split('T')[0]; 

    const [dateData, setDate] = useState<ExpirationDateState>({
        expiration_date: today
    })
   
   

    useEffect(() => {
        const date: ExpirationDateState = {
            expiration_date: new Date(accountData.start_date * 1000).toISOString().split('T')[0]
        }
        setDate(date)
    })

    const [accountData, setAccountData] = useState<Account>({
        id,
        name: '',
        account_name: '',
        email: '',
        status: '',
        start_date: 0,
        expiration_date: 0,
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
                await HttpAccounts.newAccount(accountData);
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
       <Button variant="primary" onClick={handleShow}>
            Create account
        </Button>  

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create account</Modal.Title>
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
                                onChange={handleInputChange}         
                                min={today}
                                autoFocus                               
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
                                min={dateData.expiration_date}                        
                                onChange={handleInputChange}                                       
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
                Create account
            </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default NewAccount;