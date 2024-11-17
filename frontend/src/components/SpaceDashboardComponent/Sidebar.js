import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai'; // Importing an icon for added visual appeal

const Sidebar = ({ filter, setFilter, spaceURL, setActiveComponent }) => {
    return (
        <aside className="w-full lg:w-1/4 p-6 bg-gradient-to-b from-gray-900 to-black text-gray-200 border-r border-gray-800 shadow-lg">
            <h2 className="font-semibold text-xl mb-6 text-gray-100 border-b border-gray-700 pb-2">Space Details</h2>
            <p className="text-sm mb-6 text-gray-400">
                Public URL:
                <a 
                    href={`http://localhost:3000/form/${spaceURL}`} 
                    className="block mt-1 underline text-blue-500 hover:text-blue-400 break-words" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    {`http://localhost:3000/form/${spaceURL}`}
                </a>
            </p>

            <nav className="space-y-8">
                <div className="space-y-2">
                    <p className="font-semibold text-gray-300 mb-2 border-b border-gray-700 pb-1">Inbox</p>
                    <ul className="space-y-2">
                        {['All', 'Liked', 'Archived'].map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => setFilter(item)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg border border-gray-700 transition-all duration-150 ${
                                        filter === item 
                                            ? ' border-purple-500 text-purple-300' 
                                            : 'border-gray-700 text-gray-400   hover:border-purple-500 hover:text-white'
                                    }`}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div 
                    onClick={() => setActiveComponent('wallOfLove')} 
                    className="flex items-center space-x-2 font-semibold text-gray-300 cursor-pointer border border-gray-700 rounded-lg p-3 hover:border-purple-500 hover:text-purple-300 transition-all duration-150"
                >
                    <AiOutlineHeart className="text-purple-500" /> {/* Heart icon for added visual appeal */}
                    <span>Wall of Love</span>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
