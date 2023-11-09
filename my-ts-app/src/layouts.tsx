import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './style/layouts.css'

function Layouts() {

    return (
        <>
            <header>
                <div>
                    <div className='logo'>
                        <span>WEB 22</span>
                    </div>
                    <div className='link'>
                        <NavLink to='/account'>Accounts</NavLink>
                    </div>
                    <div className='link'>
                        <NavLink to='/about/us'>About Us</NavLink>
                    </div>
                </div>
            </header>

            <Outlet />
        </>
    )
}
export default Layouts;