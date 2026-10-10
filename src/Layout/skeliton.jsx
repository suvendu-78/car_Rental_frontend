const Skeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="h-8 w-32 bg-gray-300 rounded"></div>

        <div className="flex gap-4">
          <div className="h-5 w-16 bg-gray-300 rounded"></div>
          <div className="h-5 w-16 bg-gray-300 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Heading */}
        <div className="h-8 w-64 bg-gray-300 rounded mb-8"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="h-40 bg-gray-300 rounded-lg mb-5"></div>

              <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>

              <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>

              <div className="h-4 w-2/3 bg-gray-300 rounded mb-5"></div>

              <div className="h-10 w-28 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
