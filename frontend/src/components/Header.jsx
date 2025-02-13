import React from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import SignInPage from './Signin';

const Header = ({  profilePicture}) => {
    return (
        <div className="flex justify-between items-center p-4  text-black bg-orange-400">
            {/* Logo or Title */}
            <Link to="/">
            <h1 className="text-2xl font-bold flex items-center hover: cursor-pointer">
                Code
                <span className="text-orange-700">Fusion</span>
            </h1>
                    </Link>
           

            {/* Navigation Links */}
            <ul className="flex space-x-6">
                {/* <li className="hover:text-white cursor-pointer">Question Tracker</li>
                <li className="hover:text-white cursor-pointer">Event Tracker</li> */}
                {/* <h6 className="hover:text-white cursor-pointer hover:shadow-lg" >Profile Tracker</h6> */}
                <li>
                    <Link to="/Profile" className="hover:text-white cursor-pointer hover:shadow-lg font-bold">
                        Profile Tracker
                    </Link>
                </li>
                <li>
                    <Link to="/SignInPage" className="hover:text-white cursor-pointer hover:shadow-lg font-bold ">
                        SignIn
                    </Link>
                </li>
            </ul>

            {/* Profile Picture */}
            <div className="flex items-center space-x-4 bg-black w-10 h-10 rounded-full">
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full text-white"
                />

            </div>
        </div>
    );
};

export default Header;