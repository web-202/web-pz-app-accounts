import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Account } from '../models/models';
import { Header } from './Header';
import { colors } from '../utils';
import { IoMdPerson } from "react-icons/io";
import { BsFillFilePersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";

type Props = {}

export const ProfilePage = (props: Props) => {
    const { id } = useParams();
    const [account, setAccount] = useState<Account>({} as Account)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/accounts/${id}`).then((res) => {
            setAccount(res.data)
            setIsLoading(false)
        }).catch(() => {
            navigate("/accounts")
        })
    }, [])

    return (
        <>
            <Header />
            {!isLoading && (
                <div>
                    <div className='bg-secondary w-100 mb-5' style={{ height: "150px" }}></div>
                    <div className='container'>
                        <div className='h2'>{account.name}</div>
                        <div className='d-flex gap-2 align-items-center' style={{ color: "orange" }}>
                            <IoMdPerson />
                            <div>Name:</div>
                            <div style={{ color: "black" }}>{account.name}</div>
                        </div>
                        <div className='d-flex gap-2 align-items-center' style={{ color: "orange" }}>
                            <BsFillFilePersonFill />
                            <div>Account name:</div>
                            <div style={{ color: "black" }}>{account.account_name}</div>
                        </div>
                        <div className='d-flex gap-2 align-items-center' style={{ color: "orange" }}>
                            <MdEmail />
                            <div>Email:</div>
                            <div style={{ color: "black" }}>{account.email}</div>
                        </div>
                        <div className='d-flex gap-2 align-items-center' style={{ color: "orange" }}>
                            <FaStar />
                            <div>Status:</div>
                            <div style={{ color: "black" }} className={`${colors[account.status]}`}>{account.status}</div>
                        </div>
                        <div className='d-flex gap-2 align-items-center' style={{ color: "orange" }}>
                            <AiFillClockCircle />
                            <div>Start date:</div>
                            <div style={{ color: "black" }}>{new Date(Number(account.start_date) * 1000).toDateString()}</div>
                        </div>
                        <div className='d-flex gap-2 align-items-center' style={{ color: "orange" }}>
                            <BsClockHistory />
                            <div>End date:</div>
                            <div style={{ color: "black" }}>{new Date(Number(account.expiration_date) * 1000).toDateString()}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}