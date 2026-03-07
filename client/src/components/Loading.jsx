const Loading = ({ message = 'Chargement...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 text-xl font-poppins text-primary">{message}</p>
      </div>
    </div>
  );
};
export default Loading;