import React from 'react';
<<<<<<< HEAD
import { Heart, Inbox, Link, Star, Archive } from 'lucide-react';

const Sidebar = ({
  filter,
  setFilter,
  spaceURL,
  spaceName,
  spaceLogo,
  setActiveComponent,
  activeComponent,
  onMobileItemClick
}) => {
  const baseURL = window.location.origin;
  
  const navigationItems = [
    { id: 'All', icon: <Inbox className="w-5 h-5" /> },
    { id: 'Liked', icon: <Star className="w-5 h-5" /> },
    { id: 'Archived', icon: <Archive className="w-5 h-5" /> }
  ];

  const handleItemClick = (id) => {
    setFilter(id);
    setActiveComponent('dashboard');
    onMobileItemClick?.();
  };

  return (
    <div className=" flex flex-col h-full bg-gray-950  lg:mt-0 mt-16 lg:fixed">
      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Profile Section */}
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden">
                <img 
                  src={spaceLogo} 
                  alt={spaceName} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-white truncate">
                  {spaceName}
                </h2>
              </div>
            </div>
          </div>

          {/* URL Section */}
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center text-sm text-gray-400 mb-1">
              <Link className="w-4 h-4 mr-2" />
              <span>Public URL</span>
            </div>
            <a
              href={`${baseURL}/form/${spaceURL}`}
              className="text-sm text-purple-400 hover:text-purple-300 truncate block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${baseURL}/form/${spaceURL}`}
            </a>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Inbox
            </div>
            {navigationItems.map(({ id, icon }) => (
              <button
                key={id}
                onClick={() => handleItemClick(id)}
                className={`
                  w-full flex items-center px-3 py-2 text-sm rounded-lg
                  transition-colors duration-150 ease-in-out
                  ${activeComponent === 'dashboard' && filter === id
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }
                `}
              >
                <span className="mr-3">{icon}</span>
                <span>{id}</span>
              </button>
            ))}

            <div className="mt-6">
              <button
                onClick={() => {
                  setActiveComponent('wallOfLove');
                  onMobileItemClick?.();
                }}
                className={`
                  w-full flex items-center px-3 py-2 text-sm rounded-lg
                  transition-colors duration-150 ease-in-out
                  ${activeComponent === 'wallOfLove'
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }
                `}
              >
                <Heart className="w-5 h-5 mr-3 text-purple-500" />
                <span>Wall of Love</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
=======
import { AiOutlineHeart } from 'react-icons/ai'; 

const Sidebar = ({ filter, setFilter, spaceURL, setActiveComponent }) => {
    const baseURL = window.location.origin; 
    return (
        <aside className="w-full lg:w-1/4 p-6 bg-gradient-to-b from-gray-900 to-black text-gray-200 border-r border-gray-800 shadow-lg">
            <h2 className="font-semibold text-xl mb-6 text-gray-100 border-b border-gray-700 pb-2">Space Details</h2>
            <p className="text-sm mb-6 text-gray-400">
                Public URL:
                <a 
                    href={`${baseURL}/form/${spaceURL}`} 
                    className="block mt-1 underline text-blue-500 hover:text-blue-400 break-words" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    {`${baseURL}/form/${spaceURL}`}
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
