// app/products/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/footer';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import toast from 'react-hot-toast';

// Quantity selector component
const QuantitySelector = ({ quantity, onQuantityChange, stock }) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
   <div className="flex items-center space-x-2">
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      decreaseQuantity();
    }}
    disabled={quantity <= 1}
    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
  >
    -
  </button>

  <span className="w-8 text-center text-black font-medium">{quantity}</span>

  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      increaseQuantity();
    }}
    disabled={quantity >= stock}
    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
  >
    +
  </button>
</div>

  );
};

// Skeleton loader component
const ProductSkeleton = () => (
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
const ProductListSkeleton = () => (
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

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quantities, setQuantities] = useState({}); // Track quantity for each product

  const categories = [
    { id: 'all', name: 'All Products', count: 0 }, 
    { id: 'fashion-women', name: "Women's Fashion", count: 0 },
    { id: 'fashion-men', name: "Men's Fashion", count: 0 },
    { id: 'electronics', name: 'Electronics', count: 0 },
    { id: 'home-living', name: 'Home & Living', count: 0 }
  ];

  const { addToCart, toggleCart } = useCart();
  const { 
    products, 
    loading, 
    fetchProducts,
    error, 
    clearError
  } = useProducts();

  // Initialize quantities when products change
  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities = {};
      products.forEach(product => {
        const productId = product._id || product.id;
        initialQuantities[productId] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  // Fetch products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        clearError();
        await fetchProducts();
      } catch (err) {
        console.error('Error fetching products:', err);
        toast.error('Failed to load products. Please try again.');
      }
    };

    loadProducts();
  }, []); // Remove dependencies to prevent infinite loop

  // Filter products based on selected category
  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // Update category counts dynamically
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return products.length;
    return products.filter(product => product.category === categoryId).length;
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

  // Show loading skeletons while fetching
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header/>
        
        {/* Breadcrumb */}
        <div className="bg-gray-900/50 border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <span className="text-gray-600">/</span>
              <span className="text-white font-medium">All Products</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <section className="py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  All Products
                </span>
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Loading our premium collection...
              </p>
            </div>
          </div>
        </section>

        {/* Loading Skeletons */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(filteredProducts.length)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>

        <Footer/>
      </div>
    );
  }

  // Show error state if no products and error exists
  if (!loading && products.length === 0 && error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header/>
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠</div>
            <h2 className="text-2xl font-bold mb-4">Failed to Load Products</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Try Again
            </button>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }

  // Show empty state if no products but no error
  if (!loading && products.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header/>
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
            <p className="text-gray-400 mb-6">We're working on adding products. Please check back soon!</p>
            <Link 
              href="/"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all inline-block"
            >
              Go Home
            </Link>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header/>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 mx-4 mt-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span>Error: {error}</span>
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
            <span className="text-white font-medium">All Products</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                All Products
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Discover our complete collection of premium fashion, electronics, and home goods
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2">
                <span className="text-purple-300 font-medium">{filteredProducts.length} Products</span>
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({getCategoryCount(category.id)})</span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
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
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Brand</h3>
              <div className="space-y-3">
                {['Vorvexia', 'TechPro', 'StyleCraft', 'HomeDesign', 'UrbanWear'].map((brand) => (
                  <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="accent-purple-500" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Rating</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="accent-purple-500" />
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Display */}
          <div className="flex-1">
            {loading && products.length > 0 && (
              <div className="mb-4 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                  <span className="text-gray-300">Loading more products...</span>
                </div>
              </div>
            )}

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
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
                          {product.badge && (
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                product.badge === 'Sale' ? 'bg-red-500' :
                                product.badge === 'New' ? 'bg-green-500' :
                                product.badge === 'Limited' ? 'bg-purple-500' :
                                product.badge === 'Deal' ? 'bg-orange-500' :
                                product.badge === 'Exclusive' ? 'bg-pink-500' :
                                'bg-blue-500'
                              } text-white`}>
                                {product.badge}
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

                          {/* Action buttons */}
                          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all">
                            {product.stock && product.stock > 0 && (
                              <>
                                <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                </button>
                                <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>

                          {/* Color options */}
                          {product.colors && (
                            <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                              {product.colors.slice(0, 4).map((color, index) => (
                                <div
                                  key={index}
                                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                                    color === 'black' ? 'bg-black' :
                                    color === 'white' ? 'bg-white' :
                                    color === 'blue' ? 'bg-blue-500' :
                                    color === 'brown' ? 'bg-amber-800' :
                                    color === 'tan' ? 'bg-amber-200' :
                                    color === 'navy' ? 'bg-blue-900' :
                                    color === 'burgundy' ? 'bg-red-900' :
                                    color === 'brass' ? 'bg-yellow-600' :
                                    color === 'gray' ? 'bg-gray-500' :
                                    color === 'silver' ? 'bg-gray-300' :
                                    color === 'gold' ? 'bg-yellow-400' :
                                    'bg-gray-400'
                                  }`}
                                />
                              ))}
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
                {filteredProducts.map((product) => {
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
                            {product.badge && (
                              <div className="absolute top-2 left-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  product.badge === 'Sale' ? 'bg-red-500' :
                                  product.badge === 'New' ? 'bg-green-500' :
                                  product.badge === 'Limited' ? 'bg-purple-500' :
                                  product.badge === 'Deal' ? 'bg-orange-500' :
                                  product.badge === 'Exclusive' ? 'bg-pink-500' :
                                  'bg-blue-500'
                                } text-white`}>
                                  {product.badge}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {product.name}
                              </h3>
                              
                              {/* Rating */}
                              {product.rating && (
                                <div className="flex items-center space-x-2 mb-3">
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
                                  <span className="text-gray-400 text-sm">
                                    {product.rating} ({product.reviews || 0} reviews)
                                  </span>
                                </div>
                              )}

                              {/* Colors */}
                              {product.colors && product.colors.length > 0 && (
                                <div className="flex items-center space-x-2 mb-3">
                                  <span className="text-gray-400 text-sm">Colors:</span>
                                  {product.colors.slice(0, 5).map((color, index) => (
                                    <div
                                      key={index}
                                      className={`w-5 h-5 rounded-full border border-gray-600 ${
                                        color === 'black' ? 'bg-black' :
                                        color === 'white' ? 'bg-white' :
                                        color === 'blue' ? 'bg-blue-500' :
                                        color === 'brown' ? 'bg-amber-800' :
                                        color === 'tan' ? 'bg-amber-200' :
                                        color === 'navy' ? 'bg-blue-900' :
                                        color === 'burgundy' ? 'bg-red-900' :
                                        color === 'brass' ? 'bg-yellow-600' :
                                        color === 'gray' ? 'bg-gray-500' :
                                        color === 'silver' ? 'bg-gray-300' :
                                        color === 'gold' ? 'bg-yellow-400' :
                                        'bg-gray-400'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}

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
                                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                </button>
                                
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

            {/* Show loading skeletons while loading more products */}
            {loading && products.length > 0 && (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8' : 'space-y-6 mt-8'}>
                {[...Array(6)].map((_, index) => (
                  viewMode === 'grid' ? <ProductSkeleton key={index} /> : <ProductListSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      page === 1
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => fetchProducts()}
                disabled={loading}
                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:hover:scale-100"
              >
                {loading ? 'Loading...' : 'Load More Products'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden mt-16">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss a Deal
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              Subscribe to get notified about new arrivals, exclusive sales, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all"
              />
              <button className="bg-white text-purple-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}