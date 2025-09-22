import React from 'react';

// Grid view skeleton
export const ProductSkeleton = () => (
  <div className="group animate-pulse">
    <div className="relative h-80 mb-4 overflow-hidden rounded-2xl bg-gray-800">
      <div className="w-full h-full bg-gray-700"></div>
    </div>
    <div className="space-y-2">
      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-6 bg-gray-700 rounded w-1/3"></div>
    </div>
  </div>
);

// List view skeleton
export const ProductListSkeleton = () => (
  <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 animate-pulse">
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-48 h-48 rounded-xl bg-gray-700"></div>
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="h-10 bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    </div>
  </div>
);

// Loading state component that shows product count and loading indicator
export const ProductLoadingState = ({ 
  productsCount = 0, 
  isInitialLoad = true, 
  viewMode = 'grid' 
}) => {
  if (isInitialLoad) {
    // Show skeletons for initial load
    return (
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
          : 'space-y-6'
      }>
        {[...Array(6)].map((_, index) => (
          viewMode === 'grid' 
            ? <ProductSkeleton key={index} /> 
            : <ProductListSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show loading indicator for additional products
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
        <span className="text-gray-300 font-medium">Loading more products...</span>
      </div>
      {productsCount > 0 && (
        <p className="text-sm text-gray-400">
          Showing {productsCount} products
        </p>
      )}
    </div>
  );
};

// Empty state component
export const ProductEmptyState = ({ 
  title = "No Products Found",
  message = "We're working on adding products. Please check back soon!",
  showHomeButton = true 
}) => (
  <div className="text-center py-16">
    <div className="text-gray-400 text-6xl mb-4">📦</div>
    <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
    <p className="text-gray-400 mb-6">{message}</p>
    {showHomeButton && (
      <a 
        href="/"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all inline-block transform hover:scale-105"
      >
        Go Home
      </a>
    )}
  </div>
);

// Error state component
export const ProductErrorState = ({ 
  error, 
  onRetry,
  onClearError 
}) => (
  <div className="text-center py-16">
    <div className="text-red-400 text-6xl mb-4">⚠</div>
    <h2 className="text-2xl font-bold mb-4 text-white">Failed to Load Products</h2>
    <p className="text-gray-400 mb-6">{error}</p>
    <div className="flex items-center justify-center space-x-4">
      <button 
        onClick={onRetry}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
      >
        Try Again
      </button>
      {onClearError && (
        <button 
          onClick={onClearError}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Clear Error
        </button>
      )}
    </div>
  </div>
);