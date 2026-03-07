import { FaExclamationTriangle } from 'react-icons/fa';
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <FaExclamationTriangle className="text-6xl text-danger mx-auto mb-4" />
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">
          Oups ! Une erreur est survenue
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
};
export default ErrorMessage;