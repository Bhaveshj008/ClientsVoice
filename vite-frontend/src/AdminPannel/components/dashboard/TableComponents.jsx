
import { formatDistanceToNow, format } from 'date-fns';
import { FiEye } from 'react-icons/fi';


export const EnhancedTableHeader = ({ onSort, sortConfig }) => {
    const getSortIcon = (field) => {
      if (sortConfig.sortBy !== field) return '↕';
      return sortConfig.sortOrder === 'asc' ? '↑' : '↓';
    };
  
    return (
      <thead className="bg-gray-50">
        <tr>
          {[
            { key: 'name', label: 'Client' },
            { key: 'spaces', label: 'Spaces' },
            { key: 'responses', label: 'Total Responses' },
            { key: 'lastActive', label: 'Last Active' },
            { key: 'status', label: 'Status' }
          ].map(column => (
            <th
              key={column.key}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort(column.key)}
            >
              <div className="flex items-center space-x-1">
                <span>{column.label}</span>
                <span className="text-gray-400">{getSortIcon(column.key)}</span>
              </div>
            </th>
          ))}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
    );
  };

  export const EnhancedClientRow = ({ client, onViewDetails }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {client.profilePicture ? (
            <img
              src={client.profilePicture}
              alt=""
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
              {client.name.charAt(0)}
            </div>
          )}
          <div className="ml-4">
            <div className="font-medium text-gray-900">{client.name}</div>
            <div className="text-sm text-gray-500">{client.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-sm text-gray-900 font-medium">{client.spaceDetails?.length || 0}</span>
          {client.spaceDetails?.length > 0 && (
            <span className="ml-2 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              Active
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {client.spaceDetails?.reduce((sum, space) => sum + (space.responsesCount || 0), 0)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(client.lastLogin || client.createdAt), { addSuffix: true })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          client.status === 'active' ? 'bg-green-100 text-green-800' :
          client.status === 'inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {client.status || 'pending'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={onViewDetails}
          className="text-indigo-600 hover:text-indigo-900 flex items-center transition-colors"
        >
          <FiEye className="mr-1" /> View Details
        </button>
      </td>
    </tr>
  );
  
  // Enhanced Pagination Component
  export const EnhancedPagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => (
    <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="text-sm text-gray-500">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-1 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Last
        </button>
      </div>
    </div>
  );