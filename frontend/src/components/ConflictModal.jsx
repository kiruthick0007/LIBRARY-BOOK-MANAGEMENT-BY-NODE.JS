import { FaExclamationTriangle, FaRedo, FaTimes } from 'react-icons/fa';

const ConflictModal = ({ isOpen, onClose, onRetry, conflictMessage, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FaExclamationTriangle className="text-3xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Conflict Detected</h2>
                <p className="text-sm text-orange-100 mt-1">Action couldn't be completed</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg mb-6">
            <p className="text-gray-800 font-medium">
              {conflictMessage || 'Another user has modified this resource. Please try again.'}
            </p>
          </div>

          {details && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Details:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <FaExclamationTriangle className="mr-2" />
              What happened?
            </h4>
            <p className="text-sm text-blue-700">
              The resource you're trying to modify was changed by another user or process. 
              This happens when multiple people are working simultaneously.
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onRetry}
              className="flex-1 btn btn-primary py-3 flex items-center justify-center space-x-2"
            >
              <FaRedo />
              <span>Retry Action</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 btn btn-outline py-3"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Tip: Refresh the page to see the latest data
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
