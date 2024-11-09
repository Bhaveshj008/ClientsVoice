import React from 'react';


const Sidebar = ({ filter, setFilter, spaceURL, setActiveComponent }) => {
   

    return (
        <aside className="w-full lg:w-1/4 p-6 bg-gray-800 text-gray-100">
            <h2 className="font-semibold text-xl mb-6">Space Details</h2>
            <p className="text-sm mb-6">
                Public URL:
                <a 
                    href={`http://localhost:3000/form/${spaceURL}`} 
                    className="underline text-blue-500" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    {`http://localhost:3000/form/${spaceURL}`}
                </a>
            </p>

            <nav className="space-y-3">
                <p className="font-bold text-gray-300 mb-2">Inbox</p>
                <ul className="space-y-2 text-sm">
                    {['All', 'Liked', 'Archived'].map((item) => (
                        <li key={item}>
                            <button
                                onClick={() => setFilter(item)}
                                className={`block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition-all ${
                                    filter === item ? 'bg-gray-700 text-purple-300' : ''
                                }`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
                <p
                    onClick={() => setActiveComponent('wallOfLove')} // Set the active component to 'wallOfLove'
                    className="font-bold text-gray-300 mb-2 cursor-pointer"
                >
                    Wall of Love
                </p>
            </nav>
        </aside>
    );
};

export default Sidebar;
