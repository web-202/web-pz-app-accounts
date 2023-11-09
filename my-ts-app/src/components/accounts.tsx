import React, { useState, useEffect } from 'react'
import '../style/account.css'
import axios from 'axios';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';

interface Account {
    id: number;
    name: string;
    account_name: string;
    email: string;
    status: string;
    start_date: string;
    expiration_date: string;
}   

interface SelectedValue {
    name: string;
    account_name: string;
    status: string;
    email: string;
    start_date: string;
    expiration_date: string;
}

interface ValidationErrorMessage {
    path: string;
    message: string;
}



export default function Accounts() {

    
    const today = new Date().toISOString().split('T')[0];
    const [data, setData] = useState<Account[]>([]);
    const [total, setTotal] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isName, setIsName ] = useState(false);
    const [isAccount, setIsAccount ] = useState(false);
    const [isEmail, setIsEmail ] = useState(false);
    const [selectedValue, setSelectedValue] = useState<SelectedValue>({
        name: '',
        account_name: '',
        status: 'Active',
        email: '',
        start_date: `${today}`,
        expiration_date: `${today}`
    });

    const navigate = useNavigate()

    const sortedData = [...data];
    sortedData.sort((a, b) => b.id - a.id);
    
    console.log(today);
    

    const openModal = () => {
        selectedValue.name = '';
        selectedValue.account_name = '';
        selectedValue.status = 'Active';
        selectedValue.email = '';
        selectedValue.start_date = `${today}`;
        selectedValue.expiration_date = `${today}`;
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalEdit(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-x');
        } else {
            document.body.classList.remove('overflow-x');
        }
    }, [isModalOpen]);

    useEffect(() => {
        try {
            const response = axios.get('http://localhost:3001/accounts'
            ).then(response => {
                console.log(response.data);
                setData(response.data)
                setTotal(response.data.length)
            }).catch(error => {
                console.log(error.response.data.message);
                console.log(error.response.status);
            });

        } catch (error) {
            console.error('An error occurred while submitting the form:', error);
        }
    }, []);

    function editHandle(item: Account) {
        localStorage.setItem('id', item.id.toString())
        selectedValue.name = item.name;
        selectedValue.account_name = item.account_name;
        selectedValue.status = item.status;
        selectedValue.email = item.email;
        selectedValue.start_date = dateEdit(item.start_date);
        selectedValue.expiration_date = dateEdit(item.expiration_date);

        setIsModalOpen(true);
        setIsModalEdit(true)
    }

    function dateEdit(date: string) {
        const timestamp = Number(date) * 1000;
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
        const formatted = formattedDate.replace(',', '')
        const [month, day, year] = formatted.split('/');

        if (month.length === 1) {
            if (day.length === 1) {
                console.log(`${year}-0${month}-0${day}`);
                return `${year}-0${month}-0${day}`;
            } else {
                console.log(`${year}-0${month}-${day}`);
                return `${year}-0${month}-${day}`;
            }
        } else {
            if (day.length === 1) {
                console.log(`${year}-${month}-0${day}`);
                return `${year}-${month}-0${day}`;
            } else {
                console.log(`${year}-${month}-${day}`);
                return `${year}-${month}-${day}`;
            }
        }
    }

    const btnName = (id: number) => {
        navigate(`/profile/${id}`)
    }

    const deleteHandle = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3001/accounts/${id}`)
                .then(response => {
                    console.log(response.status);
                    window.location.reload()
                }).catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }

    function dateValue(date: string) {
        const timestamp = Number(date) * 1000;
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
        const formatted = formattedDate.replace(',', '')
        const [month, day, year] = formatted.split(' ');
        return `${day} ${month} ${year}`;
    }

    const funCss = (body: String) => {
        if (body === 'Active') {
            return 'active-status'
        } else if (body === 'Pending') {
            return 'pending-status'
        } else if (body === 'Disable') {
            return 'disable-status'
        }
    }

    return (
        <main>
            <div>
                <div className='header-list'>
                    <span className='account-list'>Account List</span>
                    <button className='btn' onClick={openModal}>Create account</button>
                    {isModalOpen && <div className="overlay" onClick={closeModal}></div>}
                    <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    isModalEditConf={isModalEdit} 
                    selectedValue={selectedValue} 
                    setSelectedValue={setSelectedValue}
                    isName={isName}
                    isAccount={isAccount}
                    isEmail={isEmail}
                    setIsName={setIsName}
                    setIsAccount={setIsAccount}
                    setIsEmail={setIsEmail}
                    toDay={today}
                    >
                    </Modal>
                </div>
                <div className='total'>
                    <p>Total:{total}</p>
                </div>
                <table>
                    <thead>
                        <tr><th colSpan={7}><hr /></th></tr>
                        <tr>
                            <th>Name</th>
                            <th>Account name</th>
                            <th>E-mail</th>
                            <th>Status</th>
                            <th>Start data</th>
                            <th>Expiration date</th>
                            <th>Option</th>
                        </tr>
                        <tr><th colSpan={7}><hr /></th></tr>
                    </thead>
                    {data.length > 0 ? (
                        <tbody>
                            {sortedData.map((item, index) => (
                                <React.Fragment key={item.name}>
                                    <tr>
                                        <td><button onClick={(e) => btnName(item.id)} className='nameItem' >{item.name}</button></td>
                                        <td>{item.account_name}</td>
                                        <td>{item.email}</td>
                                        <td ><span className={funCss(item.status)}>{item.status}</span></td>
                                        <td>{item.start_date ? dateValue(item.start_date) : ''}</td>
                                        <td>{item.expiration_date ? dateValue(item.expiration_date) : ''}</td>
                                        <td>
                                            <button className='btn-edit' onClick={(e) => editHandle(item)}>Edit</button>
                                            <button className='btn-delete' onClick={(e) => deleteHandle(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                    {index < data.length - 1 && <tr><td colSpan={7}><hr /></td></tr>}
                                </React.Fragment>
                            ))}
                        </tbody>
                    ) : (
                        <p>No data available.</p>
                    )}

                </table>
            </div>
        </main>
    )
}