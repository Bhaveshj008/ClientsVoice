import React from 'react';
import { Link } from 'react-router-dom';

function SpaceContent({ space }) {
  return (
    <Link to={`/space/dashboard/${space._id}`} className="block">
      <div className="flex items-center mt-6">
        {space.logo && (
          <img
            src={space.logo}
            alt={space.spaceName}
            className="w-16 h-16 rounded-full mr-4 border-2 border-neutral-300 hover:border-purple-500"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold">
            {space.spaceName || 'Unnamed Space'}
          </h3>
          <p className="text-sm text-neutral-400 opacity-80">
            Space ID: {space._id || 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SpaceContent;
