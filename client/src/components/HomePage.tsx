import React from 'react'
import { Header } from './Header'
import { Accounts } from './Accounts'

interface Props {

}

export const HomePage = (props: Props) => {
  return (
    <div>
        <Header/>
        <Accounts/>
    </div>
  )
}