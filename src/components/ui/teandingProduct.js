"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart, Eye, ShoppingCart, Loader } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useProducts } from '@/context/ProductContext'

function TrendingProduct({ onProductClick }) {
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  const [currentImageIndexes, setCurrentImageIndexes] = useState({})
  const [autoPlay, setAutoPlay] = useState(true)
  const [displayCount, setDisplayCount] = useState(12)
  const [imageErrors, setImageErrors] = useState({})

  const { addToCart } = useCart();
  const { 
    products, 
    loading, 
    fetchProducts,
    error, 
    clearError
  } = useProducts();

  // Helper to extract image URL
  const getImageUrl = (imageData) => {
    if (!imageData) return null;
    if (typeof imageData === 'string' && imageData.trim() !== '') return imageData;
    if (imageData.url && imageData.url.trim() !== '') return imageData.url;
    return null;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const initialIndexes = {};
      products.slice(0, displayCount).forEach((product, index) => {
        if (product.images && product.images.length > 0) {
          initialIndexes[product._id || index] = 0;
        }
      });
      setCurrentImageIndexes(initialIndexes);
    }
  }, [products, displayCount]);

  useEffect(() => {
    if (!autoPlay || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes => {
        const newIndexes = { ...prevIndexes };
        Object.keys(newIndexes).forEach(productId => {
          const product = products.find(p => (p._id || p.id) === productId);
          if (product && product.images && product.images.length > 1) {
            newIndexes[productId] = (newIndexes[productId] + 1) % product.images.length;
          }
        });
        return newIndexes;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, products]);

  const handleQuickView = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onProductClick) {
      onProductClick(productId);
    }
  };

  const nextImage = (productId, productImages) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % productImages.length
    }));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevImage = (productId, productImages) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + productImages.length) % productImages.length
    }));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToImage = (productId, index) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: index
    }));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const firstImage = product.images?.[0];
    const imageUrl = getImageUrl(firstImage);
    
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: imageUrl || '/placeholder.png',
      quantity: 1
    });
  };

  const handleLoadMore = async () => {
    setLoadMoreLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayCount(prev => prev + 12);
    setLoadMoreLoading(false);
  };

  const getBadgeColor = (product) => {
    if (product.salePrice && product.originalPrice) return 'from-red-500 to-pink-600';
    if (product.productType === 'new') return 'from-green-500 to-emerald-600';
    if (product.stock < 10) return 'from-orange-500 to-red-600';
    return 'from-blue-500 to-purple-600';
  };

  const getBadgeText = (product) => {
    if (product.salePrice && product.originalPrice) return 'Sale';
    if (product.productType === 'new') return 'New';
    if (product.stock < 10) return 'Limited';
    return 'Trending';
  };

  const handleImageError = (productId, imageIndex) => {
    setImageErrors(prev => ({
      ...prev,
      [`${productId}-${imageIndex}`]: true
    }));
  };

  const displayedProducts = products.slice(0, displayCount);
  const hasMoreProducts = products.length > displayCount;

  if (loading && products.length === 0) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                Hot Right Now
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Trending Now
                </span>
              </h2>
              <p className="text-gray-400">Loading trending products...</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-80 mb-4 rounded-2xl bg-gray-800"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2 mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trending Now
            </span>
          </h2>
          <p className="text-red-400 text-lg">Error loading products: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <div>
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Hot Right Now
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Trending Now
              </span>
            </h2>
            <p className="text-gray-400">
              {displayedProducts.length} of {products.length} trending products
            </p>
          </div>
          <Link href="/all-products">
            <button className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-2 transition-colors group">
              <span>View all</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {displayedProducts.map((product, index) => {
            const productId = product._id || product.id;
            const productImages = product.images || [];
            const currentImageIndex = currentImageIndexes[productId] || 0;
            const hasMultipleImages = productImages.length > 1;
            const salePrice = product.salePrice || product.originalPrice;
            const originalPrice = product.salePrice ? product.originalPrice : null;
            
            const currentImageData = productImages[currentImageIndex];
            const currentImageUrl = getImageUrl(currentImageData);
            const showPlaceholder = !currentImageUrl || imageErrors[`${productId}-${currentImageIndex}`];

            return (
              <div 
                key={productId} 
                onClick={(e) => handleQuickView(productId, e)}
                className="group block cursor-pointer"
              >
                <div className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 h-full flex flex-col">
                  <div className="relative h-80 mb-4 overflow-hidden rounded-xl bg-gray-800 flex-shrink-0">
                    {!showPlaceholder ? (
                      <Image
                        src={currentImageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        onError={() => handleImageError(productId, currentImageIndex)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <ShoppingCart className="w-16 h-16 text-gray-500 opacity-50" />
                      </div>
                    )}
                    
                    {hasMultipleImages && !showPlaceholder && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            prevImage(productId, productImages);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            nextImage(productId, productImages);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                          {productImages.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                goToImage(productId, imgIndex);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                imgIndex === currentImageIndex
                                  ? 'bg-white w-4'
                                  : 'bg-white/50 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-50 transition-all"></div>
                    
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getBadgeColor(product)} text-white`}>
                        {getBadgeText(product)}
                      </span>
                    </div>

                    {(!product.stock || product.stock === 0) && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-gray-800/90 text-gray-300 px-3 py-1 text-xs font-medium rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                      >
                        <Heart size={16} className="text-gray-800" />
                      </button>
                      <button 
                        onClick={(e) => handleQuickView(productId, e)}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                      >
                        <Eye size={16} className="text-gray-800" />
                      </button>
                    </div>

                    {product.stock && product.stock > 0 && (
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 z-10">
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart size={18} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
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
                        <span className="text-gray-400 text-sm">({product.reviews || 0})</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">
                          €{salePrice}
                        </span>
                        {originalPrice && (
                          <span className="text-gray-500 text-sm line-through">
                            €{originalPrice}
                          </span>
                        )}
                      </div>
                      {originalPrice && (
                        <span className="text-green-400 text-xs font-medium">
                          Save €{(originalPrice - salePrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {product.stock && (
                      <p className="text-gray-400 text-sm mt-1">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {hasMoreProducts && (
          <div className="text-center">
            <button 
              onClick={handleLoadMore}
              disabled={loadMoreLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2 mx-auto"
            >
              {loadMoreLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Products</span>
                  <span className="text-sm">(+{Math.min(12, products.length - displayCount)})</span>
                </>
              )}
            </button>
            <p className="text-gray-400 text-sm mt-2">
              Showing {displayedProducts.length} of {products.length} products
            </p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No trending products available at the moment.</p>
            <Link href="/all-products" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default TrendingProduct