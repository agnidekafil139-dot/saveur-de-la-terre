const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-card p-6 animate-pulse">
    <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
    <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
  </div>
);

export default SkeletonCard;
