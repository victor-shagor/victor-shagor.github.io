import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <h3>BUS-CONNECT</h3>
        <nav className="nav">
          <ul>
            <li><Link to='/' id="nav">HOME</Link></li>
             <li><Link to='/signup' id="nav">SIGNUP</Link></li>
            <li><a id="nav">LOGIN</a></li>
            <li><a id="nav">BLOG</a></li>
          </ul>
        </nav>  
     </>
    );
};

export default Navbar;