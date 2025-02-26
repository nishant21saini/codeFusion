
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [firstname, setName] = useState(localStorage.getItem("firstname"));

    useEffect(() => {
        const interval = setInterval(() => {
            const userToken = localStorage.getItem("token");
            const name = localStorage.getItem("firstname");
            if (userToken !== token) setToken(userToken);
            if (name !== firstname) setName(name);
        }, 1000); 
        return () => clearInterval(interval); 
    }, [token, firstname]); 

    if (!token) {
        return (
            <div className="sticky top-0 flex justify-between items-center p-4 text-black bg-orange-400 z-50 shadow-md">
                <Link to="/">
                    <h1 className="text-2xl font-bold flex items-center cursor-pointer">
                        Code<span className="text-orange-700">Fusion</span>
                    </h1>
                </Link>
                <ul className="flex space-x-6">
                     <li>
                        <Link to="/Event" className="hover:text-white cursor-pointer hover:shadow-lg font-bold">
                           Contest Tracker 
                        </Link>
                    </li>
                    <li>
                        <Link to="/Signup" className="hover:text-white cursor-pointer hover:shadow-lg font-bold">
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/SignInPage" className="hover:text-white cursor-pointer hover:shadow-lg font-bold">
                            SignIn
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="sticky top-0 flex justify-between items-center p-4 text-black bg-orange-400 z-50 shadow-md">
            <Link to="/">
                <h1 className="text-2xl font-bold flex items-center cursor-pointer">
                    Code<span className="text-orange-700">Fusion</span>
                </h1>
            </Link>

            <div className="flex items-center space-x-6">
                   
                     
                        <Link to="/Event" className="hover:text-white cursor-pointer hover:shadow-lg font-bold">
                           Contest Tracker 
                        </Link>
                   
                <ul>
                    <li>
                        <Link to="/Profile" className="hover:text-white cursor-pointer hover:shadow-lg font-bold">
                            Profile Tracker
                        </Link>
                    </li>
                </ul>

                {/* Profile Icon */}
                <div className="flex items-center justify-center bg-black w-10 h-10 rounded-full">
                    <h1 className="text-white font-semibold text-lg">
                        {firstname ? firstname[0].toUpperCase() : "U"}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Header;
