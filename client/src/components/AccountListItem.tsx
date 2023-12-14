import React, { useState } from 'react'
import { Account } from '../models/models'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { EditModal } from './EditModal'
import { colors } from '../utils'
import { useNavigate } from 'react-router-dom'

type Props = {
  account: Account,
  renew: () => void,
}

export const AccountListItem = (props: Props) => {
  const [isEditShow, setIsEditShow] = useState<boolean>(false)
  const navigate = useNavigate()
  const remove = () => {
    const id = props.account.id;
    axios.delete(`http://localhost:3000/accounts/${id}`).then((res) => {
      props.renew()
    })
  }

  return (
    <>
      <tr>
        <td style={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${props.account.id}`)}>{props.account.name}</td>
        <td>{props.account.account_name}</td>
        <td >{props.account.email}</td>
        <td className={`${colors[props.account.status]}`}>{props.account.status}</td>
        <td>{new Date(Number(props.account.start_date) * 1000).toDateString()}</td>
        <td>{new Date(Number(props.account.expiration_date) * 1000).toDateString()}</td>
        <td className='text-center'>
          <Button onClick={() => setIsEditShow(true)}>Edit</Button>
        </td>
        <td className='text-center'>
          <Button className='bg-secondary' onClick={() => remove()}>Delete</Button>
        </td>
      </tr>
      <EditModal account={props.account} isShow={isEditShow} renew={props.renew} setIsShow={setIsEditShow} />
    </>

  )
}