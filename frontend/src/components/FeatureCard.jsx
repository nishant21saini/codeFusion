import React from "react";

const FeatureCard = ({ title, description }) => {
    return (
        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-300 mt-2">{description}</p>
        </div>
    );
};

export default FeatureCard;
