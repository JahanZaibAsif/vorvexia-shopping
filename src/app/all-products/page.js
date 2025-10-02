// app/products/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/footer';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import { useCategories } from '../../context/CategoryContext';
import toast from 'react-hot-toast';
import NewsLatter1 from '../../components/ui/NewsLatter1';
import QuantitySelector from '../../components/ui/QuantitySelector';

import { 
  ProductLoadingState, 
  ProductEmptyState, 
  ProductErrorState 
} from '../../components/ui/ProductSkeleton';

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  const { addToCart } = useCart();
  
  // Use CategoryContext instead of ProductContext
  const { 
    categories,
    categoryProducts,
    currentCategory,
    loading,
    productsLoading,
    error,
    productsError,
    availableBrands,
    productsPriceRange,
    fetchCategories,
    fetchProductsByCategory,
    fetchAllCategoryProducts,
    setCategoryFilters,
    clearError,
    clearProductsError
  } = useCategories();

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        await fetchCategories();
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (selectedCategory === 'all') {
          await fetchAllCategoryProducts();
        } else {
          await fetchProductsByCategory(selectedCategory);
        }
        setCurrentPage(1); // Reset to first page when category changes
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };

    loadProducts();
  }, [selectedCategory, fetchProductsByCategory, fetchAllCategoryProducts]);

  // Initialize quantities when products change
  useEffect(() => {
    if (categoryProducts.length > 0) {
      const initialQuantities = {};
      categoryProducts.forEach(product => {
        const productId = product._id || product.id;
        initialQuantities[productId] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [categoryProducts]);

  // Update price range when products change
  useEffect(() => {
    if (categoryProducts.length > 0) {
      const prices = categoryProducts.map(p => p.salePrice || p.originalPrice || p.price).filter(p => p);
      const calculatedMaxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;
      setPriceRange([0, calculatedMaxPrice]);
    }
  }, [categoryProducts]);

  // Filter products based on selected filters
  const filteredProducts = categoryProducts.filter(product => {
    // Price range filter
    const productPrice = product.salePrice || product.originalPrice || product.price || 0;
    if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
      return false;
    }

    // Brand filter
    if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.salePrice || a.originalPrice || a.price || 0;
    const priceB = b.salePrice || b.originalPrice || b.price || 0;

    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default: // featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Handle brand selection
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedBrands([]); // Clear brand filters when category changes
    setCurrentPage(1);
  };

  // Handle price range change
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  // Handle quantity change for a specific product
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productId = product._id || product.id;
    
    if (!product.stock || product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    const quantity = quantities[productId] || 1;

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }

    addToCart({
      id: productId,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.png',
      quantity: quantity
    });
    
    toast.success(`${quantity} x ${product.name} added to cart!`);
    
    // Reset quantity to 1 after adding to cart
    setQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
  };

  const handleRetry = () => {
    if (selectedCategory === 'all') {
      fetchAllCategoryProducts();
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <button 
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-all ${
            page === currentPage
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {page}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button 
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );

    return buttons;
  };

  // Get category counts
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return categoryProducts.length;
    return categoryProducts.filter(product => product.category?._id === categoryId).length;
  };

  // Combine all categories with "All Products"
  const allCategories = [
    { id: 'all', name: 'All Products', count: getCategoryCount('all') },
    ...categories.map(cat => ({ 
      id: cat._id, 
      name: cat.name, 
      count: getCategoryCount(cat._id) 
    }))
  ];

  const isLoading = loading || productsLoading;
  const hasError = error || productsError;
  const displayError = error || productsError;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header/>

      {/* Error Message */}
      {displayError && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 mx-4 mt-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span>Error: {displayError}</span>
            <button 
              onClick={clearError}
              className="text-red-200 hover:text-white ml-4"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">
              {currentCategory ? currentCategory.name : 'All Products'}
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {currentCategory ? currentCategory.name : 'All Products'}
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              {currentCategory 
                ? `Discover our ${currentCategory.name.toLowerCase()} collection`
                : 'Discover our complete collection of premium fashion, electronics, and home goods'
              }
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2">
                <span className="text-purple-300 font-medium">
                  {isLoading && categoryProducts.length === 0 ? 'Loading...' : `${sortedProducts.length} Products`}
                </span>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2">
                <span className="text-blue-300 font-medium">Free EU Shipping</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>
      </section>

      {/* Filters and Controls */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center space-x-2">
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Filter Toggle for Mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Price Range */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">€{priceRange[0]}</span>
                  <span className="text-gray-400">€{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={productsPriceRange.max || 1000}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Brand</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="accent-purple-500" 
                    />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{brand}</span>
                  </label>
                ))}
                {availableBrands.length === 0 && !isLoading && (
                  <span className="text-gray-400 text-sm">No brands available</span>
                )}
              </div>
            </div>
          </div>

          {/* Products Display */}
          <div className="flex-1">
            {/* Show different states based on loading and data */}
            {isLoading && categoryProducts.length === 0 ? (
              <ProductLoadingState 
                isInitialLoad={true}
                viewMode={viewMode}
              />
            ) : !isLoading && categoryProducts.length === 0 && hasError ? (
              <ProductErrorState 
                error={displayError}
                onRetry={handleRetry}
                onClearError={clearError}
              />
            ) : !isLoading && categoryProducts.length === 0 && !hasError ? (
              <ProductEmptyState />
            ) : (
              <>
                {/* Products Count and Pagination Info */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-400">
                    Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} products
                    {selectedCategory !== 'all' && currentCategory && ` in ${currentCategory.name}`}
                  </p>
                </div>

                {/* Products Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {paginatedProducts.map((product) => {
                      const productId = product._id || product.id;
                      const quantity = quantities[productId] || 1;
                      
                      return (
                        <Link key={productId} href={`/all-products/${productId}`} className="group block">
                          <div className="group">
                            <div className="relative h-80 mb-4 overflow-hidden rounded-2xl bg-gray-900">
                              <Image
                                src={product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.png'}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-all duration-500"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                              
                              {/* Badge */}
                              {product.salePrice && product.originalPrice && product.salePrice < product.originalPrice && (
                                <div className="absolute top-4 left-4">
                                  <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                                    Sale
                                  </span>
                                </div>
                              )}
                              {product.productType === 'new' && (
                                <div className="absolute top-4 left-4">
                                  <span className="bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                                    New
                                  </span>
                                </div>
                              )}

                              {/* Stock Status */}
                              {(!product.stock || product.stock === 0) && (
                                <div className="absolute top-4 right-4">
                                  <span className="bg-gray-800/90 text-gray-300 px-3 py-1 text-xs font-medium rounded-full">
                                    Out of Stock
                                  </span>
                                </div>
                              )}

                              {/* Quick add with quantity controls */}
                              {product.stock && product.stock > 0 && (
                                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-black text-sm font-medium">Quantity:</span>
                                      <QuantitySelector
                                        quantity={quantity}
                                        onQuantityChange={(newQuantity) => handleQuantityChange(productId, newQuantity)}
                                        stock={product.stock}
                                      />
                                    </div>
                                    <button 
                                      onClick={(e) => handleAddToCart(product, e)}
                                      className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                                    >
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                                {product.name}
                              </h3>
                              
                              {/* Rating */}
                              {product.rating && (
                                <div className="flex items-center space-x-2">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-gray-400 text-sm">({product.reviews || 0})</span>
                                </div>
                              )}
                              
                              {/* Price */}
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-white">
                                  €{product.salePrice || product.price}
                                </span>
                                {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                                  <>
                                    <span className="text-gray-500 line-through">€{product.originalPrice}</span>
                                    <span className="text-green-400 text-sm font-medium">
                                      Save €{(product.originalPrice - (product.salePrice || product.price)).toFixed(2)}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  /* List View */
                  <div className="space-y-6">
                    {paginatedProducts.map((product) => {
                      const productId = product._id || product.id;
                      const quantity = quantities[productId] || 1;
                      
                      return (
                        <Link key={productId} href={`/all-products/${productId}`} className="block">
                          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 group hover:border-purple-500/50 transition-all">
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                              {/* Product Image */}
                              <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-800">
                                <Image
                                  src={product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.png'}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-all duration-300"
                                  loading="lazy"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                    {product.name}
                                  </h3>
                                  
                                  {/* Stock Status */}
                                  <div className="mb-4">
                                    <span className={`text-sm font-medium ${
                                      product.stock && product.stock > 0 ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                      {product.stock && product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✕ Out of Stock'}
                                    </span>
                                  </div>
                                </div>

                                {/* Price and Actions */}
                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-3">
                                      <span className="text-2xl font-bold text-white">
                                        €{product.salePrice || product.price}
                                      </span>
                                      {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                                        <span className="text-gray-500 line-through text-lg">€{product.originalPrice}</span>
                                      )}
                                    </div>
                                    {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                                      <span className="text-green-400 text-sm font-medium">
                                        Save €{(product.originalPrice - (product.salePrice || product.price)).toFixed(2)}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    {product.stock && product.stock > 0 ? (
                                      <div className="flex items-center space-x-3">
                                        <QuantitySelector
                                          quantity={quantity}
                                          onQuantityChange={(newQuantity) => handleQuantityChange(productId, newQuantity)}
                                          stock={product.stock}
                                        />
                                        <button 
                                          onClick={(e) => handleAddToCart(product, e)}
                                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105"
                                        >
                                          Add to Cart
                                        </button>
                                      </div>
                                    ) : (
                                      <button className="bg-gray-700 text-gray-400 px-6 py-2 rounded-xl font-semibold cursor-not-allowed">
                                        Out of Stock
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex justify-center">
                    <div className="flex items-center space-x-2">
                      {renderPaginationButtons()}
                    </div>
                  </div>
                )}

                {/* Page Info */}
                <div className="mt-4 text-center text-gray-400 text-sm">
                  Page {currentPage} of {totalPages}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

     <NewsLatter1/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}