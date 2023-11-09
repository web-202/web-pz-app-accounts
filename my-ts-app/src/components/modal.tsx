import React, { Dispatch, SetStateAction, useState } from 'react';
import ReactDOM from 'react-dom';
import * as Yup from "yup";
import '../style/modal.css';

import Close from "../image/close_icon.png"
import axios from 'axios';

interface SelectedValue {
    name: string;
    account_name: string;
    status: string;
    email: string;
    start_date: string;
    expiration_date: string;
}

interface Account {
    id: number;
    name: string;
    account_name: string;
    email: string;
    status: string;
    start_date: string;
    expiration_date: string;
}

interface ValidationErrorMessage {
    path: string;
    message: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    isModalEditConf: boolean
    children: React.ReactNode;
    selectedValue: SelectedValue;
    setSelectedValue: Dispatch<SetStateAction<SelectedValue>>;
    isName: boolean
    isAccount: boolean
    isEmail: boolean
    setIsName: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAccount: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEmail: React.Dispatch<React.SetStateAction<boolean>>;
    toDay: string
}



const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isModalEditConf,
    selectedValue, setSelectedValue, setIsName,
    setIsAccount, setIsEmail, isName,
    isAccount, isEmail, toDay }) => {
    if (!isOpen) return null;

    let message = 'InValid field';

    const handleSubmit = async () => {
        const dateS = selectedValue.start_date
        const timestamp = new Date(dateS).getTime() / 1000;
        selectedValue.start_date = timestamp.toString();

        const dateE = selectedValue.expiration_date
        const timesTamp = new Date(dateE).getTime() / 1000;
        selectedValue.expiration_date = timesTamp.toString();



        if (!isAccount && !isEmail && !isName && selectedValue.name !== '') {
            try {
                const response = await axios.post('http://localhost:3001/accounts', selectedValue)
                    .then(response => {
                        console.log(response.data);
                        onClose()
                        window.location.reload()
                    })
            } catch (error) {
                console.log(error);
            }
        }



    }

    const handleSubmitEdit = async () => {
        const id = localStorage.getItem('id')
        const dateS = selectedValue.start_date
        const timestamp = new Date(dateS).getTime() / 1000;
        selectedValue.start_date = timestamp.toString();

        const dateE = selectedValue.expiration_date
        const timesTamp = new Date(dateE).getTime() / 1000;
        selectedValue.expiration_date = timesTamp.toString();

        if (!isAccount && !isEmail && !isName) {
            try {
                const response = await axios.put(`http://localhost:3001/accounts/${id}`, selectedValue)
                    .then(response => {
                        console.log(response.data);
                        onClose()
                        window.location.reload()
                    })
            } catch (error) {
                console.log(error);
            }
        }




    }

    const blurHandle = (event: React.FocusEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'name':
                if (!/^[A-Za-z\d]+$/.test(selectedValue.name)) {
                    setIsName(true)
                }
                break
            case 'account_name':
                if (!/^[A-Za-z\d]+$/.test(selectedValue.account_name)) {
                    setIsAccount(true)
                }
                break
            case 'email':
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(selectedValue.email)) {
                    setIsEmail(true)
                }
                break
        }
    }

    const focusHandle = (event: React.FocusEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'name':
                setIsName(false)
                console.log('accountFocus');
                break
            case 'account_name':
                setIsAccount(false)
                console.log('accountFocus');
                break
            case 'email':
                setIsEmail(false)
                console.log('accountFocus');
                break
        }
    }

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='header-modal'>
                    {!isModalEditConf ? 
                    <span className='name-modal'>Create account</span>: 
                    <span className='name-modal'>Update account</span>}
                    <button onClick={onClose} className="close-button">
                        <img src={Close} alt='' />
                    </button>
                </div>
                <hr />
                <div>
                    <div className='name'>
                        <label htmlFor="name">Name*</label>
                        <input type="text" name='name'
                            className={isName ? 'error' : ''}
                            onBlur={event => blurHandle(event)}
                            onFocus={event => focusHandle(event)}
                            value={selectedValue.name} onChange={(e) => setSelectedValue({ ...selectedValue, name: e.target.value })}/>
                        {isName ? <span className='message'>{message}</span> : ''}
                    </div>
                    <div className='account'>
                        <label htmlFor="account_name">Account</label>
                        <input onBlur={event => blurHandle(event)} onFocus={event => focusHandle(event)} className={isAccount ? 'error' : ''} type='text' name='account_name' value={selectedValue.account_name} onChange={(e) => setSelectedValue({ ...selectedValue, account_name: e.target.value })} />
                        {isAccount ? <span className='message'>{message}</span> : ''}
                    </div>
                    <div className='select-div'>
                        <label htmlFor="select">Example select*</label>
                        <select className="select" name='status' value={selectedValue.status} onChange={(e) => setSelectedValue({ ...selectedValue, status: e.target.value })}>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Disable">Disable</option>
                        </select>
                    </div>
                    <div className='email'>
                        <label htmlFor="email">Email*</label>
                        <input type="email" name='email'
                            onBlur={event => blurHandle(event)}
                            onFocus={event => focusHandle(event)}
                            className={isEmail ? 'error' : ''}
                            value={selectedValue.email}
                            onChange={(e) => setSelectedValue({ ...selectedValue, email: e.target.value })} />
                        {isEmail ? <span className='message'>{message}</span> : ''}
                    </div>
                    <div className='start-end'>
                            <div className='start'>
                                <label htmlFor="start" >Start date</label>
                                <input type="date" name='start_date' value={selectedValue.start_date} onChange={(e) => setSelectedValue({ ...selectedValue, start_date: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="end">Expiration date</label>
                                <input type="date" name="expiration_date" value={selectedValue.expiration_date} onChange={(e) => setSelectedValue({ ...selectedValue, expiration_date: e.target.value })} />
                            </div> 
                    </div>
                    <hr />
                    <div className='buttons'>
                        <button className='cancel' onClick={onClose}>
                            Cancel
                        </button>
                        {!isModalEditConf ? 
                        <button className={!isAccount && !isEmail && !isName ? " save" : 'disablebtn save'} 
                            disabled={!isAccount && !isEmail && !isName ? false : true} 
                            type='submit' 
                            onClick={handleSubmit}>
                            Save
                        </button>:
                        <button className='save' type='submit' onClick={handleSubmitEdit}>
                            Save
                        </button>}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
export default Modal;
