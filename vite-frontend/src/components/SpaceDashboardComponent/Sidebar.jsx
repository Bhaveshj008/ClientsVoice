import React from 'react';
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
