const FeatureCard = ({ image, title, description }) => {
    return (
        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-4 transform hover:scale-105 transition-transform duration-300">
            <img
                src={image}
                alt={title}
                className=" w-40 h-40 object-cover rounded-md"
                loading="lazy"
            />
            <h3 className="text-xl font-semibold mt-4">{title}</h3>
            <p className="text-gray-300 mt-2">{description}</p>
        </div>
    );
};
export default FeatureCard;