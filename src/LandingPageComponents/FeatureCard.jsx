import React from 'react';

const FeatureCard = ({ title, description, icon, onClick}) => {
    return (
        <div className="feature bg-white px-8 py-5 h-64 rounded-t-full shadow-md hover:bg-sukoon-green-light hover:text-white transition-all duration-300 flex flex-col items-center justify-center cursor-pointer max-w-[250px]"
            onClick={onClick}>
            {icon && <div className="text-4xl mb-4">{icon}</div>}
            <h3 className="text-xl font-bold text-center">{title}</h3>
            <p className="mt-2 text-center">{description}</p>
        </div>
    );
};

export default FeatureCard;
