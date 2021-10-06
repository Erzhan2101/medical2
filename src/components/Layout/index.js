import React from 'react';
import {NavLink} from "react-router-dom";
import "./style.css"
import logo from "./logo.png"

const Layout = ({children}) => {
    return (
        <main className="main">
            <aside className="aside">
                <img src={logo} alt="Medical" className="logo"/>
                <ul className="nav">

                    <li className="nav-item">
                        <NavLink to='/'><i className='bx bxs-dashboard'/>Проекты</NavLink>
                    </li>

                </ul>
            </aside>
            <div className="content">
                <div>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Layout;