import React, { useState } from 'react';
import api from '../api';

function DeleteModal({ spaceName, spaceId, onClose, onDelete }) {
  const [enteredName, setEnteredName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setError('');
    if (enteredName !== spaceName) {
      setError('Space name does not match. Please enter it correctly.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/spaces/delete/${spaceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onDelete(spaceId);
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setLoading(false);
      console.error('Error deleting space:', err);
      setError('Failed to delete space. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 border border-purple-500">
        <h2 className="text-lg font-semibold text-red-500">
          {success ? 'Space Deleted' : 'Confirm Deletion'}
        </h2>
        {success ? (
          <p className="text-green-500 mt-2">Space deleted successfully!</p>
        ) : (
          <>
            <p className="text-neutral-300 mt-2">
              Deleting this space will also delete all its responses and forms.
              This action is irreversible.
            </p>
            <p className="text-neutral-400 mt-4">
              Please enter the space name <strong>{spaceName}</strong> to confirm.
            </p>
            <input
              type="text"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              className="w-full mt-4 p-2 rounded bg-gray-900 text-neutral-300 border border-neutral-600 focus:outline-none focus:border-purple-500"
              placeholder="Enter space name"
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-neutral-300 rounded hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-neutral-100 rounded hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
              >
                {loading ? <span className="loader">Deleting</span> : 'Delete'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeleteModal;
