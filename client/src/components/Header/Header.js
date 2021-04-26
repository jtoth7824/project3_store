 
import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
 
    <div className="header_topbar">
        {/* Logo */}
        <div className="container"> 
                <div className="header_top_right list-unstyled">
                    <ul>
                        <li><i className="fa fa-tags"></i>Members receive 10% off their purchase!</li>
                        <li><i className="fa fa-heart"></i>Favorites</li>
                    </ul>
                </div>
                <div className="header_top_left">
                    <ul className="header_socil list-inline pull-left">  
                        <li><Link to="/contact" target="_blank"><i className="fa fa-envelope"></i>Contact Us</Link></li>
                        <li>
                            <a href="//facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="//twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="//instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="//pinterest.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-pinterest"></i></a>
                        </li>
                    </ul>
                </div>
                <Link className="more-link" to="/login" >
                    Login
                </Link>                
            </div>
 
    </div> 
 
	)
}


export default Header;