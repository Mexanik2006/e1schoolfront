import React, { useState } from 'react';
import Logo from '../../image/logo.png';
import { FaBarsStaggered } from 'react-icons/fa6';
import "./Navbar.css"

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="Navbar">
            <div className="logo">
                <a href="/">
                    <img src={Logo} alt="" />
                </a>
            </div>

            <div className={`navbar_links ${openMenu ? 'open' : ''}`}>
                <div className="link_page">
                    <a href="/">Bosh saxifa</a>
                </div>
                <div className="link_page">
                    <a href="/about-page">Biz haqimmizda</a>
                </div>
                <div className="link_page">
                    <a href="/news-page">So'ngi yangilik</a>
                </div>
                <div className="link_page">
                    <a href="/teacher-page">O'qituvchilar</a>
                </div>
                <div className="link_page">
                    <a href="/contact-page">Biz bilan bog'lanish</a>
                </div>
            </div>

            <div className="menu_btn">
                <button onClick={() => setOpenMenu(!openMenu)}>
                    <FaBarsStaggered />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
