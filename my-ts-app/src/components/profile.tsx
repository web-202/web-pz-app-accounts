import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import '../style/profile.css';
import Sky from '../image/image.png';

import Name from '../image/user-icon.png'
import User from '../image/account-icon.png'
import Status from '../image/status-icon.png'
import Email from '../image/email-icon.png'
import Start from "../image/start-icon.png"
import Expiration from '../image/end-icon.png'

interface Account {
    id: number;
    name: string;
    account_name: string;
    email: string;
    status: string;
    start_date: string;
    expiration_date: string;
}

export default function Profile() {
    const [data, setData] = useState<Account | null>(null);
    const { id } = useParams();

    console.log(data);
    

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/accounts/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    function date(date: string) {
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
        <div >
            <img src={Sky} alt="" className='image' />
            <div className='main'>
            {data ? (
                <div >
                    <ul><span className='name'>{data.name}</span>
                        <li><img className='icon' src={Name} alt="" /><span className='spanText'>Name:</span> {data.name}</li>
                        <li><img className='icon' src={User} alt="" /><span className='spanText'>Account name:</span> {data.account_name}</li>
                        <li><img className='icon' src={Email} alt="" /><span className='spanText'>Email:</span> {data.email}</li>
                        <li><img className='icon' src={Status} alt="" /><span className='spanText'>Status:</span> <span className={funCss(data.status)}>{data.status}</span></li>
                        <li><img className='icon' src={Start} alt="" /><span className='spanText'>Start date:</span> {date(data.start_date)}</li>
                        <li><img className='icon' src={Expiration} alt="" /><span className='spanText'>Expiration date:</span> {date(data.expiration_date)}</li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
}
