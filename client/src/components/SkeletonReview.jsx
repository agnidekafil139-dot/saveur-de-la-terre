const SkeletonReview = () => (
  <div className="card animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
      <div className="h-3 bg-gray-200 rounded w-4/6" />
    </div>
  </div>
);

export default SkeletonReview;
