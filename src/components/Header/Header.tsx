import React from "react"
import { Nav } from "react-bootstrap"
import "./style/style.scss"
import { useLocation, Outlet, Link } from 'react-router-dom';

const Header: React.FC = () => {
    
    const location = useLocation()

    return <>
        <Nav variant="underline" defaultActiveKey={location.pathname} className="navbar-dark bg-dark">
            <Nav.Item>
                <div className="logo">
                    WEB 22
                </div>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/accounts'>
                    Accounts
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/about'>
                    About us
                </Nav.Link>
            </Nav.Item>
        </Nav>

        <Outlet/>
    </>
}


export default Header;