// app/products/page.js
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/Header';

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', count: 124 },
    { id: 'fashion-women', name: "Women's Fashion", count: 45 },
    { id: 'fashion-men', name: "Men's Fashion", count: 38 },
    { id: 'electronics', name: 'Electronics', count: 28 },
    { id: 'home-living', name: 'Home & Living', count: 13 }
  ];

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 149.99,
      originalPrice: 199.99,
      image: "/product-headphones.jpg",
      category: "electronics",
      rating: 4.8,
      reviews: 245,
      badge: "Best Seller",
      colors: ['black', 'white', 'blue'],
      inStock: true
    },
    {
      id: 2,
      name: "Minimalist Smart Watch",
      price: 299.99,
      originalPrice: null,
      image: "/home2.jpg",
      category: "electronics",
      rating: 4.9,
      reviews: 189,
      badge: "New",
      colors: ['black', 'silver', 'gold'],
      inStock: true
    },
    {
      id: 3,
      name: "Luxury Leather Backpack",
      price: 179.99,
      originalPrice: 229.99,
      image: "/product-backpack.jpg",
      category: "fashion-men",
      rating: 4.7,
      reviews: 156,
      badge: "Sale",
      colors: ['brown', 'black', 'tan'],
      inStock: true
    },
    {
      id: 4,
      name: "Smart Home Speaker",
      price: 199.99,
      originalPrice: 249.99,
      image: "/product-speaker.jpg",
      category: "electronics",
      rating: 4.6,
      reviews: 324,
      badge: "Limited",
      colors: ['black', 'white'],
      inStock: false
    },
    {
      id: 5,
      name: "Designer Silk Dress",
      price: 249.99,
      originalPrice: null,
      image: "/woman-fashion.jpg",
      category: "fashion-women",
      rating: 4.9,
      reviews: 89,
      badge: "Exclusive",
      colors: ['black', 'navy', 'burgundy'],
      inStock: true
    },
    {
      id: 6,
      name: "Modern Floor Lamp",
      price: 129.99,
      originalPrice: 159.99,
      image: "/home1.jpg",
      category: "home-living",
      rating: 4.5,
      reviews: 78,
      badge: "Sale",
      colors: ['black', 'white', 'brass'],
      inStock: true
    },
    {
      id: 7,
      name: "Casual Denim Jacket",
      price: 89.99,
      originalPrice: null,
      image: "/men-fashion.jpg",
      category: "fashion-men",
      rating: 4.4,
      reviews: 203,
      badge: "Popular",
      colors: ['blue', 'black', 'gray'],
      inStock: true
    },
    {
      id: 8,
      name: "Wireless Charging Pad",
      price: 49.99,
      originalPrice: 69.99,
      image: "/electronic1.jpg",
      category: "electronics",
      rating: 4.3,
      reviews: 445,
      badge: "Deal",
      colors: ['black', 'white'],
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
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

          {/* Products Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                <Link key={product.id} href={`/all-products/${product.id}`} className="group block">
                <div key={product.id} className="group">
                    <div className="relative h-80 mb-4 overflow-hidden rounded-2xl bg-gray-900">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                      
                      {/* Badge */}
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

                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-gray-800/90 text-gray-300 px-3 py-1 text-xs font-medium rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all">
                        {product.inStock && (
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
                      <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                        {product.colors.map((color, index) => (
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

                      {/* Quick add button */}
                      {product.inStock && (
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                          <button className="w-full bg-white text-black py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                            Quick Add to Cart
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
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
                        <span className="text-gray-400 text-sm">({product.reviews})</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">€{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through">€{product.originalPrice}</span>
                        )}
                        {product.originalPrice && (
                          <span className="text-green-400 text-sm font-medium">
                            Save €{(product.originalPrice - product.price).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                    </Link>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 group hover:border-purple-500/50 transition-all">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                      {/* Product Image */}
                      <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-800">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-300"
                        />
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
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {product.name}
                          </h3>
                          
                          {/* Rating */}
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
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>

                          {/* Colors */}
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-gray-400 text-sm">Colors:</span>
                            {product.colors.map((color, index) => (
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

                          {/* Stock Status */}
                          <div className="mb-4">
                            <span className={`text-sm font-medium ${
                              product.inStock ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                            </span>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl font-bold text-white">€{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-gray-500 line-through text-lg">€{product.originalPrice}</span>
                              )}
                            </div>
                            {product.originalPrice && (
                              <span className="text-green-400 text-sm font-medium">
                                Save €{(product.originalPrice - product.price).toFixed(2)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            {product.inStock ? (
                              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105">
                                Add to Cart
                              </button>
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
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105">
                Load More Products
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